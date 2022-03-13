import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .dim-overlay {
    background: rgba(57, 55, 72, 0.22);
    position: absolute;
    top: 80px;
    width: 100vw;
    height: 100%;
    z-index: 1;
  }

  .products {
    margin-top: 100px;
    display: grid;
    grid-template-columns: 386px;

    gap: 40px;

    transition: all 0.2s ease-in-out;

    @media (min-width: 1000px) {
      grid-template-columns: 386px 386px;
    }
    @media (min-width: 1400px) {
      grid-template-columns: 386px 386px 386px;
    }
    @media (min-width: 1800px) {
      grid-template-columns: 386px 386px 386px 386px;
    }
    .product {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 386px;
      height: 444px;
      transition: all 0.2s ease-in-out;

      &:hover {
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);

        figure {
          .circle {
            display: flex;
          }
        }
      }

      figure {
        height: 338px;
        width: 356px;

        text-align: center;
        margin-bottom: 0;
        position: relative;

        .product-image {
          height: 338px;
          width: 356px;
          background-position: center;
          background-size: cover;
        }

        .circle {
          height: 52px;
          width: 52px;
          background-color: #5ece7b;
          border-radius: 50%;
          position: absolute;
          bottom: -26px;
          right: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          display: none;

          cursor: pointer;
        }
      }

      .content {
        width: 354px;
        height: 58px;
        padding: 16px;

        p {
          margin: 0;
          line-height: 28.8px;
        }
      }
    }
  }
`;
