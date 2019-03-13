/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

module.exports = function createLicenseBook(dependencies, type = 'plain') {
  switch (type) {
  case 'plain':
    return createLicenseBook_Plain(dependencies);
  case 'html':
    return createLicenseBook_HTML(dependencies);
  default:
    throw new Error('unknown type');
  }
};

function createLicenseBook_Plain(dependencies) {

  function createShortEntry(dependency) {

    const {
      name,
      repository
    } = dependency;

    return `${name}${repository ? ` (${repository})` : ''}`;
  }

  function createEntry(dependency) {

    const {
      name,
      licenseText
    } = dependency;

    return `%% ${name} NOTICES AND INFORMATION BEGIN HERE
==========================================
${licenseText}
==========================================
END OF ${name} NOTICES AND INFORMATION`;
  }

  return `camunda-modeler

THIRD-PARTY SOFTWARE NOTICES AND INFORMATION
Do Not Translate or Localize

This project incorporates components from the projects listed below. The original copyright notices and the licenses under which Camunda received such components are set forth below.

${dependencies.map(createShortEntry).map((val, idx) => `${ rightPad(`${idx + 1}.`, 6) }${val}`).join('\n')}


${dependencies.map(createEntry).join('\n\n\n')}
`;
}

/* eslint-disable-next-line no-unused-vars */
function createLicenseBook_HTML(dependencies) {

  function createEntry(dependency) {

    const {
      name,
      repository,
      licenseText
    } = dependency;

    return `
<div class="product">
<span class="title">${name}</span>
<a class="show" href="#">show license</a>
${
  repository ? `<span class="homepage"><a href="${repository}">homepage</a></span>` : ''
}
<div class="licence">
<pre>${ licenseText.replace(/</g, '&lt;') }</pre>
</div>
</div>
    `;
  }


  return `
<!-- Generated by tasks/create-license-book.js; do not edit. -->
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Camunda Modeler Credits</title>
<style>
body {
  background-color: white;
  font-size: 84%;
  max-width: 1020px;
}
.page-title {
  font-size: 164%;
  font-weight: bold;
}
.product {
  background-color: #c3d9ff;
  border-radius: 5px;
  margin-top: 16px;
  overflow: auto;
  padding: 2px;
}
.product .title {
  float: left;
  font-size: 110%;
  font-weight: bold;
  margin: 3px;
}
.product .homepage {
  float: right;
  margin: 3px;
  text-align: right;
}
.product .homepage::after {
  content: " - ";
}
.product .show {
  float: right;
  margin: 3px;
  text-align: right;
}
.licence {
  background-color: #e8eef7;
  border-radius: 3px;
  clear: both;
  display: none;
  padding: 16px;
}
.licence h3 {
  margin-top: 0;
}
.licence pre {
  white-space: pre-wrap;
}
.dialog #print-link,
.dialog .homepage {
  display: none;
}
</style>
</head>
<body>
<span class="page-title" style="float:left;">Credits</span>
<a id="print-link" href="#" style="float:right;">Print</a>
<div style="clear:both; overflow:auto;">

<!-- We <3 the following projects -->
${
  dependencies.map(createEntry).join('\n\n')
}
</div>
<script>
function $(id) { return document.getElementById(id); }

function toggle(o) {
  var licence = o.nextSibling;

  while (licence.className != 'licence') {
    if (!licence) return false;
    licence = licence.nextSibling;
  }

  if (licence.style && licence.style.display == 'block') {
    licence.style.display = 'none';
    o.textContent = 'show license';
  } else {
    licence.style.display = 'block';
    o.textContent = 'hide license';
  }
  return false;
}

document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('a.show');
  for (var i = 0; i < links.length; ++i) {
    links[i].onclick = function() { return toggle(this); };
  }

  $('print-link').onclick = function() {
    window.print();
    return false;
  };
});
</script>
</body>
</html>
  `;
}


function rightPad(str, length) {

  str = String(str);

  while (str.length < length) {
    str += ' ';
  }

  return str;
}