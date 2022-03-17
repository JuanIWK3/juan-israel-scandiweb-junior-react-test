import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Raleway, sans-serif;
  text-decoration: none;
}
body {
  min-height: 100vh;
  color: #000;
}

a {
  color: #000;
}

.App {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


 `;
