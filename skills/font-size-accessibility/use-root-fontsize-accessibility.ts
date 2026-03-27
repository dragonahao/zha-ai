import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { ModuleType } from "../types/plugin";
import { DbmEventManager } from "../../../plugin/impl/DbmEventManager";


export function useRootFontSizeAccessibility() {
    const [rootFontSizeStyle, setRootFontSizeStyle] = useState<React.CSSProperties>()
    useEffect(() => {
        let moduleType = DbmEventManager.getInstance()?.getLucaPluginParam()?.moduleType as ModuleType;
        var fsScaleFactor = (Taro.getAppBaseInfo() as any).fontSizeScaleFactor as number | null | undefined
        console.log("useFontSizeAccessibility fs=", fsScaleFactor)
        if (fsScaleFactor == null) {
            fsScaleFactor = 1;
        }
        if (fsScaleFactor < 0) {
            fsScaleFactor = 1
        }

       // if (moduleType == "lungFunction") {
            setRootFontSizeStyle({
                "--font-size-scale-factor": fsScaleFactor
            } as React.CSSProperties)
       // }
    }, []);

    return [rootFontSizeStyle, setRootFontSizeStyle]

}


