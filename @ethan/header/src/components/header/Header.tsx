import { ReactNode, useState } from 'react';
import { css } from '@emotion/css';
import { useAtom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

type User = {
  name: string;
};

const userAtom = atomWithStorage<User | undefined>("userAtom", undefined);

export const useIsAuthenticated = () => {
  const [user] = useAtom(userAtom);
  return !!user;
};

export const Header = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useAtom(userAtom);
  const [username, setUsername] = useState("");
  
  return (
    <div className={styles.page}>
      <header>
        <div className={styles.header}>
          <div>
            <h1>Header</h1>
          </div>
            {user ? (
              <form key="out" onSubmit={(e) => {
                e.preventDefault();
                setUser(undefined);
              }}>
                <span className={styles.welcome}>
                  Welcome, <b>{user.name}</b>!
                </span>
                <button>Sign out</button>
              </form>
            ) : (
              <form key="in" onSubmit={(e) => {
                e.preventDefault();
                setUser({ name: username });
              }}>
                <label>
                  Username:
                  <input value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <button>Sign in</button>
              </form>
            )}
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

const styles = {
  header: css`
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      display: inline-block;
      vertical-align: top;
    }

    h1 {
      font-weight: 900;
      font-size: 20px;
      line-height: 1;
      margin: 6px 0 6px 10px;
      display: inline-block;
      vertical-align: top;
    }

    button + button {
      margin-left: 10px;
    }
  `,
  welcome: css`
    color: #333;
    font-size: 14px;
    margin-right: 10px;
  `,
  page: css`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    
    main {
      flex-grow: 1;
      // fixes a browser bug where this element "has no height"
      height: 1px;
    }
  `
}