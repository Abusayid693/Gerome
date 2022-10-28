import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  padding-top: 100px;

  .hero-header {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding-top: 30px;

    .hero-header-first {
      color: white;
      font-family: 'Inter var';
      font-size: 6rem;
      margin: 0;
    }

    .hero-header-second {
      font-size: 6rem;
      background-image: linear-gradient(to right, #c084fc, #db2777);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      // color: white;

      margin: 0;
    }
  }

  .hero-sub-header {
    text-align: center;
    color: #8595a9;
    margin-top: 20px;

    .hero-sub-header-1,
    .hero-sub-header-2,
    .hero-sub-header-3 {
      font-weight: 300;
      margin: 5px 0;
      font-size: 20px;
    }
  }

  .hero-link-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: center;
    width: 100%;
    margin-top: 40px;

    .hero-link-group-link-1,
    .hero-link-group-link-2 {
      padding: 10px 17px;
    }
  }
`;
