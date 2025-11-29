/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["*.html", "./src/**/*.{html,js}"],
  content: ['./templates/**/*.html', './static/js/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  
  plugins: [],
  
  "scripts": {
  "watch": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css --watch",
  "build": "tailwindcss -i ./static/css/input.css -o ./static/css/output.css"
}

};
