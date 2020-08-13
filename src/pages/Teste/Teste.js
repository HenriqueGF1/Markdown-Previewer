import React, { useState, useEffect } from "react";

import "./styles.css";

import marked from "marked";

marked.setOptions({
  breaks: true,
  gfm: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  xhtml: true,
});

function Teste() {
  let valueInitial =
    localStorage.getItem("Markdown") !== null
      ? localStorage.getItem("Markdown")
      : "";
  const [input, setInput] = useState(valueInitial);

  useEffect(() => {
    localStorage.setItem("Markdown", input);
  }, [input]);

  function copyText() {
    if (input === "") {
      alert("Não Ha Texto Para Ser Copiado");
      return;
    }
    var copyText = document.getElementById("mark");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Seu Texto Foi Copiado ");
  }

  function clearText() {
    if (window.confirm("Quer Mesomo Apagar Seu Markdown ?")) {
      document.getElementById("mark").value = "";
      setInput("");
    }
  }
  function clearStorage() {
    if (window.confirm("Quer Mesomo Limpar da Memoria o Seu Markdown ?")) {
      setInput("");
      localStorage.clear();
    }
  }

  return (
    <div>
      <div className="header">
        <h1>Markdown Preview</h1>
      </div>

      <div className="buttons">
        <button onClick={copyText} id="copy">
          Copiar
        </button>
        <button onClick={clearText} id="clear">
          Limpar
        </button>
        <button onClick={clearStorage} id="clearStorage">
          Limpar Storage
        </button>
      </div>

      <div className="main">
        <textarea
          id="mark"
          autofocus="true"
          rows="150"
          cols="90"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="preview">
          <div
            dangerouslySetInnerHTML={{
              __html: marked(input),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Teste;
