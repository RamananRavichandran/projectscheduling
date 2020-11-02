from setuptools import setup, find_packages

requires = [
    'flask',
    'flask-sqlalchemy',
    'psycopg2',
]

setup(
    name='projectscheduling',
    version='0.0',
    description='project- resource scheduling built with Flask',
    author='ramanan',
    author_email='gr.ramanan2010@gmail.com',
    keywords='resource allocation api',
    packages=find_packages(),
    include_package_data=True,
    install_requires=requires
)