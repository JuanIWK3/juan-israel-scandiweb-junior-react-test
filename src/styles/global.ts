import { createGlobalStyle } from 'styled-components';

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

.dim-overlay {
  background: rgba(57, 55, 72, 0.22);
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.empty-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;               
}
 `;
