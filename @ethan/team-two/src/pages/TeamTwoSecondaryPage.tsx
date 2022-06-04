import { useIsAuthenticated } from "@ethan/header";
import { css } from "@emotion/css";

export const TeamTwoSecondaryPage = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className={styles.page}>
      <span>This is team <b className={styles.team}>two's</b> secondary page and the user is {isAuthenticated ? "authenticated" : "unauthenticated"}</span>
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