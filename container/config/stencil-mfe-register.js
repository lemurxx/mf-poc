module.exports = srv => `
    <link rel="stylesheet" href="${srv}/segmentation/segmentation.css" />
    <script type="module">
        import { defineCustomElements } from "${srv}/esm/loader.js";
        defineCustomElements();
    </script>`;