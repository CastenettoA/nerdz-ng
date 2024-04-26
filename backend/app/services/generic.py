import inspect

def get_function_names_from_file(file_path):
    function_names = [name for name, obj in inspect.getmembers(__import__(file_path[:-3])) if inspect.isfunction(obj)]
    
    # remove useless function name  
    useless_name = ["check_jwt", "authorize", "jsonify", "make_response", "redirect", "render_template", "url_for"]
    for n in function_names:
        if n in useless_name: 
            function_names.remove(n)

    return function_names

# def open_server_in_webbrowser_tab(context):
#     """simply open the server (main.py) in a browser tab on app start up
#        edit: this not work on WSL2."""
#     logging.info(f"the name is: {context}")
    
#     # if context == "app":
#     webbrowser.open("https://127.0.0.1/")
        
