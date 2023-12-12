const OutputType = {
    SqlWhereClause: {
      label: "SQL Where Clause",
      type: "sql",
    },
    CSharpArray: {
      label: "C# Array",
      type: "csharp",
    },
    RubyList: {
      label: "Ruby & Python List",
      type: "ruby",
    },
    JavaList: {
      label: "Java List",
      type: "java",
    },
    JavaScript: {
      label: "JavaScript Array",
      type: "js",
    },
  };

  function generateStrings() {
    const inputStrings = document
      .getElementById("inputStrings")
      .value.split("\n")
      .filter(Boolean);
    const outputForms = document.getElementById("outputForms");
    outputForms.innerHTML = "";
    const outputTypes = [
      OutputType.SqlWhereClause,
      OutputType.CSharpArray,
      OutputType.RubyList,
      OutputType.JavaList,
    ];

    outputTypes.forEach((outputType, index) => {
      const formLabel = outputType.label;
      const formOutput = generateString(inputStrings, outputType);

      const formHTML = `
      <div class="field">
        <label class="label">${formLabel}</label>
        <div class="control button-container">
          <input id="output${index}" class="input is-static" type="text" value="${formOutput}" readonly>
          <button class="button is-info copy-button" data-clipboard-target="#output${index}">Copy</button>
        </div>
      </div>
    `;

      outputForms.innerHTML += formHTML;
    });

    new ClipboardJS(".button");
  }

  function generateString(input, outputType) {
    var output = "";
    switch (outputType) {
      case OutputType.RubyList:
        output = `[${input.map((x) => `"${x}"`).join(", ")}]`;
        break;

      case OutputType.SqlWhereClause:
        output = `(${input.map((x) => `'${x}'`).join(", ")})`;
        break;

      case OutputType.CSharpArray:
        output = `new [] { ${input.map((x) => `"${x}"`).join(", ")} }`;
        break;

      case OutputType.JavaList:
        output = `Arrays.asList(${input.map((x) => `"${x}"`).join(", ")})`;
        break;
    }
    console.log(outputType.label, output);
    return escapeHTML(output);
  }

  function escapeHTML(str) {
    return str.replace(/"/g, "&quot;");
  }