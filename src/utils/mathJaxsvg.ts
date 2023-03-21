import { mathjax } from "mathjax-full/js/mathjax";
import { TeX } from "mathjax-full/js/input/tex";
import { SVG } from "mathjax-full/js/output/svg";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages";

const html = mathjax.document("", {
  InputJax: new TeX({ packages: AllPackages }),
  OutputJax: new SVG({ fontCache: "none" }),
});

export function mathJaxSvg(expression: string) {
  const node = html.convert(expression, { display: true });
  const svgOut = node.innerHTML;
  const svgUrl = encodeURI("data:image/svg+xml;utf-8," + svgOut);
  return svgUrl;
}
