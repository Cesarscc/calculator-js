import { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState("");
  const [operation, setOperation] = useState("0");

  const handleChangeOperation = (op) => {
    if (
      !(
        result[result.length - 1] == "+" ||
        result[result.length - 1] == "-" ||
        result[result.length - 1] == "/" ||
        result[result.length - 1] == "·"
      ) ||
      !(op == "X" || op == "/" || op == "+" || op == "-")
    ) {
      //Verificamos que no se ingrese doble operacion seguida
      if (!operation.includes(".") || op != ".") {
        //verificamos que no se puedan ingresar 2 puntos decimales
        if (op == "=") {
          //si es el operador resultado
          if (
            result[result.length - 1] == "+" ||
            result[result.length - 1] == "-" ||
            result[result.length - 1] == "/" ||
            result[result.length - 1] == "·"
          ) {
            //Verificamos que el ultimo a operar sea un operador, si es así lo sacamos de la operación
            setResult((prevSate) => prevSate.slice(0, -1)); //lo sacamos de la operación el último operando
            const formatRpta = result.slice(0, -1).replace("·", "*");
            const rpta = eval(formatRpta).toFixed(10); //realizamos la operacion con el ultimo operador ya sacado
            setResult((prevSate) => prevSate + "=" + rpta);
            setOperation(rpta);
          } else {
            //SI NO ES EL OPERADOR RESULTADO
            if (result.length == 0) {
              //si no hay nada que operar
              setResult("=NaN");
              setOperation("NaN");
            } else {
              //Si hay algo que operar
              const formatRpta = result.replace(/·/g, "*"); //cambiamos a multiplicar
              if (eval(formatRpta).toString().indexOf(".") !== -1) {
                //vERIFICAMOS SI TIENE DECIMALES
                const rpta = eval(formatRpta).toFixed(10);
                setResult((prevSate) => prevSate + "=" + rpta);
                setOperation(rpta);
              } else {
                const rpta = eval(formatRpta).toString();
                setResult((prevSate) => prevSate + "=" + rpta);
                setOperation(rpta);
              }
            }
          }
        } else {
          if (result.includes("=")) {
            if (op == "+" || op == "/" || op == "-" || op == "X") {
              setResult(operation);
            } else {
              setResult("");
            }
          }
          if (result.includes("Infinity")) {
            setResult("");
          }
          if (result.length > 0) {
            //SI LA CADENA ES MAYOR QUE 0
            if (op == "+" || op == "/" || op == "-" || op == "X") {
              setOperation(op); //SI ES ALGUNA OPERACION
            } else if (
              //Si donde se realiza la operacion tiene un operador
              operation == "+" ||
              operation == "/" ||
              operation == "-" ||
              operation == "X"
            ) {
              setOperation("");
              setOperation((prevState) => prevState + op);
            } else {
              setOperation(
                (prevState) =>
                  prevState.replace("NaN", "").replace("Infinity", "") + op
              );
            }
          } else {
            setOperation(op);
          }
          if (op == "X") {
            setResult((prevSate) => prevSate + "·");
          } else if (op == "." && result.length == 0) {
            setResult("0.");
          } else {
            setResult((prevSate) => prevSate + op);
          }
        }
      } else if (result.length > 0) {
        if (result.includes("=")) {
          setResult("0.");
          setOperation("0.");
        }
      }
    }
  };

  const handleClear = () => {
    setOperation("0");
    setResult("");
  };

  return (
    <>
      <main id="calculator">
        <div id="display">
          <div id="result">{result}</div>
          <div id="operation">{operation}</div>
        </div>
        <div id="buttons">
          <button id="clear" onClick={handleClear}>
            AC
          </button>
          <button id="divide" onClick={() => handleChangeOperation("/")}>
            /
          </button>
          <button id="multiply" onClick={() => handleChangeOperation("X")}>
            X
          </button>
          <button id="seven" onClick={() => handleChangeOperation("7")}>
            7
          </button>
          <button id="eight" onClick={() => handleChangeOperation("8")}>
            8
          </button>
          <button id="nine" onClick={() => handleChangeOperation("9")}>
            9
          </button>
          <button id="subtract" onClick={() => handleChangeOperation("-")}>
            -
          </button>
          <button id="four" onClick={() => handleChangeOperation("4")}>
            4
          </button>
          <button id="five" onClick={() => handleChangeOperation("5")}>
            5
          </button>
          <button id="six" onClick={() => handleChangeOperation("6")}>
            6
          </button>
          <button id="add" onClick={() => handleChangeOperation("+")}>
            +
          </button>
          <button id="one" onClick={() => handleChangeOperation("1")}>
            1
          </button>
          <button id="two" onClick={() => handleChangeOperation("2")}>
            2
          </button>
          <button id="three" onClick={() => handleChangeOperation("3")}>
            3
          </button>
          <button id="equals" onClick={() => handleChangeOperation("=")}>
            =
          </button>
          <button id="zero" onClick={() => handleChangeOperation("0")}>
            0
          </button>
          <button id="decimal" onClick={() => handleChangeOperation(".")}>
            .
          </button>
        </div>
      </main>
      <p id="author">Coded By César Colorado</p>
    </>
  );
}

export default App;
