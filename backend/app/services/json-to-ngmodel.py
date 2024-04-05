"""module for convert a json standard response in an angular typescript model"""
import argparse, json

# init parse to get the interface name argument
parser = argparse.ArgumentParser()
parser.add_argument("--name", help="is the name of the Angular Interface. The result will be: interface InterfaceName { ... }")
args = parser.parse_args()

# read and parse the json file to a plain python object
with open('json-response.json') as file:
    json_response = json.load(file) # is a python object

interface_name = "Example"
if(args.name):
    interface_name = args.name # save the eventual user interface name arg

# init the typescript interface
ts_model = f"export interface {interface_name} {{"

def translate_type(value): 
    """Translate python object type in typescript property type"""
    t = type(value).__name__
    if t == "str": return "string"
    if t == "bytes": return "string"
    if t == "int": return "number"
    if t == "float": return "number"
    if t == "bool": return "boolean"
    return "unknown"

def parse_dict_recursively(key, child_dict, ts_model="", level=1):
    """Parse the json props that contain another Dict recursively"""

    identation = "  " * level
    ts_model += f"\n{identation}{key}: {{"

    if(type(child_dict) is dict):
        for key, value in child_dict.items():
            if(type(value) is dict):
                ts_model = parse_dict_recursively(key, value, ts_model, level+1)
                ts_model += f"\n{identation}}}," # todo: add identation
            else:
                ts_model += f"\n{identation}  {key}: {translate_type(value)};"
    else: 
        # print(f"prinding the simple no-dict child: {child_dict}")
        ts_model += f"\n{identation}{key}: {translate_type(child_dict)};"

    return ts_model

# iterating on object to build up the typescript interface
# check if json_response is a dict
if isinstance(json_response, dict): 
    # start iteration inside the dict
    for key, value in json_response.items():
        # if type is dict we need to iterate inside it
        if(type(value) is dict):
            ts_model = parse_dict_recursively(key, value, ts_model)
            ts_model += "\n}," # todo: add identation
        # instead if not a dict we can directly save the property with the correct converted type
        else:
            ts_model += f"\n {key}: {translate_type(value)};"
# todo: gestire questo tipo con un else -> { "status" : 200 }. json singolo

# add a line breaks and close the typescript interface
ts_model += "\n}"
print(ts_model)
"""
   Step da eseguire:
    4. gestire tipi di dato complessi (es. array, oggetti)
    5. salvare in un file esterno
"""

# TYPE_MAP: Dict[str, str] = {
#     "bool": "boolean",
#     "str": "string",
#     "int": "number",
#     "float": "number",
#     "complex": "number",
#     "Any": "any",
#     "Dict": "Record<any, any>",
#     "List": "Array<any>",
#     "Tuple": "[any]",
#     "Union": "any",
# }
