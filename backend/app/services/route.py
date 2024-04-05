from services.generic import get_function_names_from_file

# Define available routes to show it recursively (e.g. in the home page)
app_routes = []

def create_route_names(): 
    """init route dictionary for future usage"""

    names = get_function_names_from_file("routes.py")
    for n in names:
        app_routes.append({ "path": f"/{n}", "name": n})