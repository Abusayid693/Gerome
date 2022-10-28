import styled from 'styled-components';

export const Container = styled.div`
  margin-top: -150px;

  .features-headings {
    text-align: center;
    .features-title {
      color: white;
      font-size: 35px;
      font-weight: 600;
    }

    .features-sub-title {
      text-align: center;
      color: #8595a9;
      margin-top: 20px;
      font-size: 20px;
      font-weight: 400;
    }
  }

  .features {
    max-width: 1200px;
    margin: 0 auto;
  }

  .features-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;

    .features-list-item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background-color: #0a0a0a;
      padding: 20px 25px;
      border: 1px solid rgba(255, 255, 255, 0.03);
      border-radius: 10px;
      cursor: pointer;

      .features-list-item-picture {
        background-color: white;
        width: 30px;
        height: 30px;
        padding: 8px;
        position: relative;
        border-radius: 50%;
      }
      .features-list-item-img {
        width: 90%;
        height: 90%;
      }
      .features-list-item-title {
        color: white;
        font-size: 19px;
        font-weight: 400;
        margin: 0;
      }
      .features-list-item-content {
        color: white;
        font-size: 16px;
        font-weight: 300;
        margin: 0;
        margin-top: 10px;
        line-height: 25px;
        color: #828a94;
      }

      &:hover {
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
    }
  }
`;
