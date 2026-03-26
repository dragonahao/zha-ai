import json
from dataclasses_json import dataclass_json
from dataclasses import dataclass

@dataclass_json
@dataclass
class Pure:
    parentIndex:int


if __name__ == '__main__':
    pure=Pure(0)
    a=pure.to_json()
    # error
    # s=json.dumps(pure)
    print(a)