const OutputType = {
    SqlWhereClause: {
      label: "SQL Where Clause",
      type: "sqlwhere",
    },
    SqlTempTable: {
      label: "SQL Temp Table",
      type: "sqltemptbl",
    },
    CSharpArray: {
      label: "C# Array",
      type: "csharparray",
    },
    RubyList: {
      label: "Ruby & Python List",
      type: "rbpylist",
    },
    JavaList: {
      label: "Java List",
      type: "javalist",
    },
    JavaScript: {
      label: "JavaScript Array",
      type: "jsarray",
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
      OutputType.SqlTempTable,
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
    switch (outputType.type) {
      case OutputType.RubyList.type:
        output = `[${input.map((x) => `"${x}"`).join(", ")}]`;
        break;

      case OutputType.SqlWhereClause.type:
        output = `(${input.map((x) => `'${x}'`).join(", ")})`;
        break;

      case OutputType.SqlTempTable.type:
        // SELECT str INTO #tmp FROM ('a'' AS str UNION SELECT ''b'' AS str UNION SELECT ''c') q
        output = `SELECT str INTO #tmp FROM (SELECT ${input.map((x) => `'${x}'`).join(" AS str UNION SELECT ")} AS str) q`;
        break;

      case OutputType.CSharpArray.type:
        output = `new [] { ${input.map((x) => `"${x}"`).join(", ")} }`;
        break;

      case OutputType.JavaList.type:
        output = `Arrays.asList(${input.map((x) => `"${x}"`).join(", ")})`;
        break;
    }
    console.log(outputType.label, output);
    return escapeHTML(output);
  }

  function escapeHTML(str) {
    return str.replace(/"/g, "&quot;");
  }