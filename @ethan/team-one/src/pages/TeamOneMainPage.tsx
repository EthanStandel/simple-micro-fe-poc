import { useIsAuthenticated } from "@ethan/header";
import { css } from "@emotion/css";

export const TeamOneMainPage = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className={styles.page}>
      <p>This is team <b className={styles.team}>one's</b> main page and the user is {isAuthenticated ? "authenticated" : "unauthenticated"}</p>
    </div>
  );
};

const styles = {
  page: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  `,
  team: css`
    color: red;
  `
}