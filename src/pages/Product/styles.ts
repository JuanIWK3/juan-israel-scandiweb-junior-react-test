import styled from 'styled-components';

export const Container = styled.div`
  padding: 80px;
  min-height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 500px) {
      .gallery {
        .images-list {
          width: max-content;

          .image {
            width: 60px;
            height: 60px;
          }
        }

        .selected-image {
          width: 457px;
          height: 382px;
        }
      }
    }

    @media (min-width: 1000px) {
      flex-direction: row;

      .gallery {
        flex-direction: row;

        .images-list {
          flex-direction: column;
          max-height: 510px;
          overflow: auto;
          margin-bottom: 0;

          &::-webkit-scrollbar {
            /* Hide scrollbar for Chrome, Safari and Opera */
            display: none;
          }
          & {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .image {
            width: 80px;
            height: 80px;
            margin-bottom: 40px;
          }
        }

        .selected-image {
          width: 610px;
          height: 510px;
        }
      }

      .content {
        width: 293px;
        padding: 0;

        .description {
          max-height: 120px;
        }
      }
    }

    @media (min-width: 1400px) {
      width: 1238px;
      .gallery {
        .selected-image {
          margin-left: 100px;
        }
      }
    }
    @media (min-width: 1800px) {
      width: 1664px;
      .gallery {
        .selected-image {
          width: 732px;
          height: 612px;
          margin-left: 250px;
        }
      }
    }
  }

  .gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .images-list {
      display: flex;
      flex-direction: row;
      overflow: auto;
      margin-bottom: 40px;

      .image {
        width: 40px;
        height: 40px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
      }
    }
    .selected-image {
      width: 250px;
      height: 204px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;

      @media (min-width: 1400px) {
      }
    }
  }

  .content {
    padding: 20px;

    .brand {
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .name {
      font-size: 30px;
      margin-bottom: 43px;
    }

    .options {
      margin-bottom: 40px;

      .attr {
        margin-bottom: 8px;

        .attr-name {
          display: flex;
          font-family: Roboto;
          font-weight: 700;
          margin-bottom: 8px;

          .selected-value {
            font-weight: 400;
          }
        }

        .attr-values {
          display: flex;
          flex-wrap: wrap;

          .attr-value:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .price-wrapper {
      margin-bottom: 20px;

      .price {
        font-family: Roboto;
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 10px;
      }

      .amount {
        font-family: Raleway;
        font-weight: 700;
        font-size: 24px;
      }
    }

    .add-to-cart {
      width: 292px;
      height: 52px;
      border: none;
      background: #5ece7b;
      color: #fff;
      margin-bottom: 40px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;

      &.out-of-stock {
        background-color: #ccc;
        cursor: default;
      }
    }

    .description {
      font-size: 16px;
      font-family: Roboto;
      font-weight: 400;
      line-height: 25.59px;
      overflow: auto;
    }
  }
`;

export const AttrButton = styled.button`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 63px;
  height: 45px;
  text-align: center;

  margin-right: 12px;
  margin-bottom: 12px;

  border: 1px solid #ccc;
  font-family: Source Sans Pro;
  font-size: 16px;
  cursor: pointer;

  &.selected {
    border: 1px solid #111;
  }

  &.swatch {
    background: ${(props: { attrColor: string }) => props.attrColor};
  }
`;
