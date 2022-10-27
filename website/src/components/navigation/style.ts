import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: calc(100% - 40px);
  left: 0;

  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(50px);
  margin: 0;
  padding: 0 20px;
  border-bottom: 1.5px solid #151b24;

  .navigation-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    .navigation-logo-icon {
      width: 25px;
    }

    .navigation-logo-title {
      color: white;
      font-size: 20px;
    }
  }

  .navigation-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
  }

  .navigation-button-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .navigation-links-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    border-left: 2px solid #151b24;
    padding-left: 10px;

    .navigation-links-list-item {
      cursor: pointer;
      color: red;

      & img {
        width: 25px;
        height: 25px;
        color: red;
      }
    }
  }
`;
