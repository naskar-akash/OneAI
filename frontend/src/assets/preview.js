const preview = (htmlFile, cssFile, jsFile) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${cssFile?.content || ""}</style>
</head>
<body>
  ${htmlFile?.content || ""}
  <script>${jsFile?.content || ""}</script>
</body>
</html>`

export default preview;