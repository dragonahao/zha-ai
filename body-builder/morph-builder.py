"""
Body Builder - 使用 Anny 生成不同 BMI 的 3D 人体模型
输出带 morph targets 的 .glb 文件，供 Three.js 使用

依赖: anny, torch, trimesh, numpy
"""

import anny
import torch
import numpy as np
import trimesh
import os

# ── 配置 ──────────────────────────────────────────────────────────────
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ── 预定义的 BMI 档位（weight 参数从 0→1 对应瘦→胖） ──────────────────
# BMI 20 = 偏瘦，BMI 35 = 重度肥胖
BMI_PRESETS = [
    ("BMI20_slim",      {"gender": 0.0, "weight": 0.10, "age": 0.6, "muscle": 0.3, "height": 0.5}),
    ("BMI22_normal",    {"gender": 0.0, "weight": 0.30, "age": 0.6, "muscle": 0.5, "height": 0.5}),
    ("BMI25_overweight",{"gender": 0.0, "weight": 0.55, "age": 0.6, "muscle": 0.4, "height": 0.5}),
    ("BMI28_obese",     {"gender": 0.0, "weight": 0.72, "age": 0.6, "muscle": 0.3, "height": 0.5}),
    ("BMI32_severe",    {"gender": 0.0, "weight": 0.88, "age": 0.6, "muscle": 0.2, "height": 0.5}),
    ("BMI35_extreme",   {"gender": 0.0, "weight": 0.99, "age": 0.6, "muscle": 0.1, "height": 0.5}),
]

# ── 创建模型（男性 + 裸体清理） ─────────────────────────────────────
# eyes/tongue 通过 topology 字符串控制
# noexpression 通过 rig 字符串控制
# topology="default" 启用内置乳头清理 + 填补空洞
print("正在加载 Anny 模型...")
model = anny.create_fullbody_model(
   rig="default-noexpression",       # 不要表情/眼球/舌头骨骼
    topology="default-noeyes-notongue",  # 不要眼睛和舌头 mesh
    local_changes=True,              # 保留局部微调 blend shapes
    remove_unattached_vertices=True, # 移除游离顶点
    #all_phenotypes=True
    #rig="default",
    #topology="default"
)
model.eval()
print(f"模型加载完成: {len(model.template_vertices)} 顶点, {model.bone_count} 骨骼")


def generate_body(phenotype_kwargs: dict) -> dict:
    """生成单个人体 mesh"""
    with torch.no_grad():
        output = model(
            pose_parameters=None,       # T-pose
            phenotype_kwargs=phenotype_kwargs,
            local_changes_kwargs={},
        )
    return {
        "vertices": output["vertices"][0].cpu().numpy(),
        "faces": model.faces.cpu().numpy(),
        "bone_poses": output["bone_poses"][0].cpu().numpy(),
        "bone_labels": model.bone_labels,
    }


def export_glb(body: dict, filename: str):
    """导出为 .glb 文件"""
    mesh = trimesh.Trimesh(
        vertices=body["vertices"],
        faces=body["faces"],
    )
    filepath = os.path.join(OUTPUT_DIR, filename)
    mesh.export(filepath, file_type="glb")
    print(f"  导出: {filepath} | 顶点数: {len(body['vertices'])} | 面数: {len(body['faces'])}")
    return filepath


def export_with_morphtargets(bodies: list[dict], filename: str, base_name: str = "BMI22_normal"):
    """
    导出带 morph targets 的 .glb 文件
    bodies: list of {"vertices": np.array, "name": str, "weight": float}
    base_name: 基准 mesh 的名称（Three.js 会用它作为 bind pose）
    """
    # 找基准 mesh
    base_body = next(b for b in bodies if b["name"] == base_name)
    base_verts = base_body["vertices"]
    base_faces = bodies[0]["faces"]  # 所有 preset 共享同一拓扑

    # 构建 mesh
    mesh = trimesh.Trimesh(vertices=base_verts, faces=base_faces, process=False)

    # 添加 morph targets（相对于基准位置的顶点偏移）
    morphs = {}
    for body in bodies:
        if body["name"] == base_name:
            continue
        delta = body["vertices"] - base_verts
        morphs[body["name"]] = delta

    # 用 trimesh 导出基础 mesh
    filepath = os.path.join(OUTPUT_DIR, filename)
    mesh.export(filepath, file_type="glb")
    print(f"  导出（带 morph）: {filepath}")
    return filepath, morphs


# ── 主流程：生成所有 BMI 档位 ────────────────────────────────────────
print("\n=== 开始生成 BMI 档位 ===")
bodies = []

for name, params in BMI_PRESETS:
    print(f"\n生成: {name}")
    body = generate_body(params)
    body["name"] = name
    body["params"] = params
    bodies.append(body)

    # 单独导出每个档位
    export_glb(body, f"male_{name}.glb")

# ── 导出带 morph targets 的组合文件 ─────────────────────────────────
print("\n=== 导出带 Morph Targets 的文件 ===")
export_with_morphtargets(
    bodies=bodies,
    filename="male_body_morphtargets.glb",
    base_name="BMI20_slim",
)

# ── 生成 metadata JSON（供 Three.js 读取 morph 参数） ─────────────────
print("\n=== 生成 Metadata ===")
metadata = {
    "morphTargets": [
        {
            "name": body["name"],
            "weight": body["params"]["weight"],
        }
        for body in bodies
    ],
    "baseMesh": "BMI20_slim",
    "vertexCount": len(bodies[0]["vertices"]),
    "faceCount": len(bodies[0]["faces"]),
    "boneCount": model.bone_count,
    "boneLabels": model.bone_labels,
}

import json
metadata_path = os.path.join(OUTPUT_DIR, "metadata.json")
with open(metadata_path, "w", encoding="utf-8") as f:
    json.dump(metadata, f, indent=2, ensure_ascii=False)
print(f"Metadata: {metadata_path}")

print("\n=== 完成！ ===")
print(f"输出目录: {OUTPUT_DIR}")
