import styled from 'styled-components';
import { AttrBtnProps } from '../../interfaces';

export const ListImage = styled.div`
  width: 40px;
  height: 40px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${(props: { image: string }) => props.image});
  cursor: pointer;
`;

export const SelectImage = styled.div`
  width: 250px;
  height: 204px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${(props: { image: string }) => props.image});

  @media (min-width: 500px) {
    width: 457px;
    height: 382px;
  }

  @media (min-width: 1000px) {
    width: 610px;
    height: 510px;
  }

  @media (min-width: 1400px) {
    margin-left: 120px;
  }
  @media (min-width: 1800px) {
    width: 732px;
    height: 612px;
    margin-left: 250px;
  }
`;

export const ImageList = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  margin-bottom: 40px;

  @media (min-width: 500px) {
    width: max-content;

    .image {
      width: 60px;
      height: 60px;
    }
  }

  @media (min-width: 1000px) {
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
  position: relative;

  background: ${(props: AttrBtnProps) => props.selected && '#1D1F22'};
  color: ${(props: AttrBtnProps) => props.selected && '#FFFFFF'};

  &.swatch {
    background: ${(props: AttrBtnProps) => props.attrColor};
    width: ${(props: AttrBtnProps) => props.selected && '51px'};
    height: ${(props: AttrBtnProps) => props.selected && '34px'};
    margin: ${(props: AttrBtnProps) => props.selected && '5px 20px 18px 4px'};
    .selected-border {
      display: flex;
    }
  }

  .selected-border {
    display: none;
    position: absolute;
    width: 63px;
    height: 45px;
    border: 3px solid #555;
    border-radius: 0.2rem;
  }
`;

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

    @media (min-width: 1000px) {
      flex-direction: row;

      .gallery {
        flex-direction: row;
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
    }
    @media (min-width: 1800px) {
      width: 1664px;
    }
  }

  .gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
        }

        .attr-values {
          display: flex;
          flex-wrap: wrap;
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
