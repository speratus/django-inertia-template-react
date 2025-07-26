# Django Inertia Template (React)

This is a template repository for bootstrapping an application based on the following stack:

* Django
* Inertia
* React
* Tailwind CSS
* Vite
* TypeScript

## Usage

The first step for using this template is to create a new repository based on this template.

Once your new repository is created, you will likely want to take a number of customization steps:

1. Change the name of the application. There are two parts to this:
    a. Rename the `webapp` directory to the name of your application
    b. Update python references to the `webapp` package to the name of your application. For example, in the `settings.py` file, you will need to change the `ROOT_URLCONF` property and `WSGI_APPLICATION` property so that they reference the new package name instead of `webapp`.
2. Rename the default `app` app to a more descriptive name. Similarly to step 1, you will also need to replace any python references to the `app` package with the new version of your package name.
    * At the moment, this only entails changing the `app` reference in the `INSTALLED_APPS` setting in `settings.py`.
3. If you do not want your python virtual environment to be inside your project directory, delete the `.venv` folder within the project.

At some point in the future, I may also provide a cookiecutter template that will perform the customization for you.

## Install dependencies

1. **Install python dependencies:** You can do this either with `pip install -r requirements.txt` or `pipenv install`. **NOTE: If you install without pipenv and have deleted the `.venv` folder, make sure you have activated a virtual environment, otherwise you will install the dependencies globally.**
2. **Install JavaScript depdencies:** `cd frontend` then `npm i` or `npm ci` if you want the exact versions specified in `package-lock.json`.
3. **Run Migrations:** With your virtual environment activated, run `python manage.py migrate`.

## Running the development server

You will need two terminal windows to do this. In one, run
```sh
npm run dev
```
And in the other, with your virtual environment activated,
```
python manage.py runserver
```

You should now be able to access the development server running at `http://localhost:8000`.

## Development notes

Configuring Django with Inertia can be a somewhat challenging experience, here are some things that you need to know:

### Important files

The inertia template is located at `templates/inertia_layout.html`. Note the use of the `vite_*` related tags and the `{% load django_vite %}` tag near the top of the file.
These tags are required to load the Vite assets used by Inertia. There are more details on how Vite is configured to integrate with Django below.

The `{% block inertia %}` tags are also key in integrating Django with Inertia.

The main entrypoint for Inertia is located at `frontend/src/main.jsx`. This is a basic Inertia entrypoint that can be customized to your needs.

### Using Tailwind CSS

If all goes well, you should be able to use Tailwind classes in your react components and in your Django templates out of the box.
This template is configured to use Tailwind 4, so make sure you are familiar with Tailwind 4
if you run into trouble.

An important thing to note about Tailwind 4 is that it will scan your source files for potential "class" attributes.
By default, it will only do that in directories that are children of the `frontend` directory.
However, to simplify your development experience, I have added a `@source` call that 
should allow Tailwind to detect your Django templates as well. See `frontend/src/styles.css`.

### How does Django find Vite assets?

Because This stack does not have an `index.html` entrypoint for Vite, you will
need to explicitly declare entrypoint files in the `build.rollupOptions.input`
configuration variable.

This can be a rather finicky process if you do not know what to expect.

If you want to allow `django_vite` to load an entrypoint script by using `{% vite_asset 'myscript.js' %}`, the following criteria must be met:

* The script file must be directly within the "root" of the project.
* Despite this, in the `build.rollupOptions.input` map, the path to the entrypoint must be specified relative to the `vite.config.ts` file.
* The name that you give to the entrypoint (i.e. the key for the file path) may need to be identical to the name of the file minus the file extension. This requires confirmation.

If you use a Vite asset that is not specified in the Rollup input map, you may discover that your asset loads correctly
in development, but not in production. This is because Vite will only include
a file in the manifest if it can determine that it is an entrypoint that is
loaded at some point. Thus, you may find that your file is not in the
production manifest. The easiest workaround for this is simply
to include your entrypoint in the `build.rollupOptions.input` map to begin with.

### How do I load a Vite stylesheet in a Django template?

Unlike JavaScript or TypeScript source files, you cannot use the `{% vite_asset %}` tag to load stylesheets.
This is because the `vite_asset` tag will automatically wrap the url in a
`<script>` tag.

Instead, you need to include the following HTML snippet to load a stylesheet in your template:

```html
<link rel="stylesheet" href="{% vite_asset_url '<PATH_TO_STYLESHEET>.css' %}">
```

The `vite_asset_url` will return the bare URL to your stylesheet asset which can then be used in the `href` attribute as normal.
