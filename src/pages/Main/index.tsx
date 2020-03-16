import React, { useState, useEffect, useCallback } from "react";
import RandomColor from "randomcolor";

import {
  Container,
  ColorBlock,
  LabelResult,
  CounterResult,
  CounterLine
} from "./styles";

const shuffle = (a: any[]) => {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

interface ICustomColor {
  seed?: number;
  fixed?: string;
  alpha?: number;
  diff?: boolean;
}

export default function Main() {
  const [color, setColor] = useState<ICustomColor[]>([]);
  const [seed, setSeed] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [totals, setTotals] = useState<number[]>([0, 0]);
  const [columns, setColumns] = useState<number>(5);
  const [level, setLevel] = useState<number>(5);

  const handleColumns = useCallback(
    (def: any, diff?: any): ICustomColor[] => {
      if (columns <= 0) {
        return [];
      }
      const aux = [];
      for (let i = 0; i < columns; i++) {
        if (i === 0 && diff) {
          aux.push(diff);
        } else {
          aux.push(def);
        }
      }
      return aux;
    },
    [columns]
  );

  const resetColor = () => {
    next();
    setShow(false);
    setDisabled(true);
    const aux = {
      fixed: "#000"
    };

    setColor(handleColumns(aux));
    setTimeout(() => {
      generateSeed();
      setDisabled(false);
    }, 1000);
  };

  const generateColor = useCallback(() => {
    const defaultAlpha = 1 - level / 10;
    const diffAlpha = defaultAlpha + Math.random() * (level / 10);
    const aux = {
      seed,
      alpha: defaultAlpha
    };
    const colors = handleColumns(aux, { ...aux, diff: true, alpha: diffAlpha });
    setColor(shuffle(colors));
  }, [handleColumns, level, seed]);

  const generateSeed = () => {
    setSeed(Math.round(Math.random() * 100000));
  };

  const next = () => {
    const aux = totals;
    aux[0] = totals[0] + 1;
    setTotals(aux);
  };
  const acerto = () => {
    const aux = totals;
    aux[1] = totals[1] + 1;
    setTotals(aux);
  };

  useEffect(() => {
    generateColor();
  }, [generateColor, seed]);

  useEffect(() => {
    generateSeed();
  }, []);
  return (
    <>
      <CounterResult>
        <CounterLine>Total: {totals[0] + 1}</CounterLine>
        <CounterLine>Acertos: {totals[1]}</CounterLine>
        <CounterLine>
          <button
            onClick={resetColor}
            disabled={disabled}
            style={{ width: "100%" }}
          >
            Nova cor
          </button>
        </CounterLine>
        <CounterLine>Colunas</CounterLine>
        <CounterLine style={{ display: "flex", flex: 1 }}>
          <button
            onClick={() => columns > 2 && setColumns(columns - 1)}
            disabled={columns <= 2 || disabled}
          >
            {"<"}
          </button>
          <span style={{ marginLeft: "5px", marginRight: "5px" }}>
            {columns}
          </span>
          <button
            onClick={() => columns < 9 && setColumns(columns + 1)}
            disabled={columns >= 9 || disabled}
          >
            {">"}
          </button>
        </CounterLine>
        <CounterLine>Destaque</CounterLine>
        <CounterLine style={{ display: "flex", flex: 1 }}>
          <button
            onClick={() => level > 1 && setLevel(level - 1)}
            disabled={level <= 1 || disabled}
          >
            {"<"}
          </button>
          <span style={{ marginLeft: "5px", marginRight: "5px" }}>{level}</span>
          <button
            onClick={() => level < 9 && setLevel(level + 1)}
            disabled={level >= 9 || disabled}
          >
            {">"}
          </button>
        </CounterLine>
      </CounterResult>
      <Container onClick={() => disabled || setShow(true)}>
        {color.map((el: ICustomColor, i: number) => {
          const hexColor = RandomColor({
            seed: el.seed
          }).toUpperCase();
          const renderColor =
            el.fixed ||
            RandomColor({
              seed: el.seed,
              format: "rgba",
              alpha: el.alpha || 1
            });
          return (
            <ColorBlock
              key={i}
              color={renderColor}
              diff={el.diff}
              onClick={() => {
                if (!disabled) {
                  if (el.diff) {
                    acerto();
                  }
                  setShow(true);
                }
              }}
            >
              {show && (
                <LabelResult>
                  {el.diff && (
                    <>
                      <strong>
                        <span style={{ color: RandomColor({ seed: el.seed }) }}>
                          Cor: {hexColor}
                        </span>
                        <br />
                      </strong>
                    </>
                  )}
                  Opacidade: {(el.alpha! * 100).toFixed(1)}%
                </LabelResult>
              )}
            </ColorBlock>
          );
        })}
      </Container>
    </>
  );
}
