import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateName } from "../features/user";

function Profile() {
  const [isEditMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const username = useMemo(
    () => `${firstName} ${lastName}`,
    [firstName, lastName]
  );

  const nameChangeError = useSelector((state) => state.user.nameChangeError);
  const profileError = useSelector((state) => state.user.profileError);

  const handleChangeName = (event) => {
    event.preventDefault();

    dispatch(
      updateName(
        event.target.elements.firstName.value,
        event.target.elements.lastName.value
      )
    );

    setEditMode(false);
  };

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <>
      <main className="main bg-dark">
        {profileError ? (
          <p className="error-text">{profileError}</p>
        ) : (
          <>
            {" "}
            <div className="header">
              <h1>
                Welcome back
                {!isEditMode && (
                  <>
                    <br />
                    {username}!
                  </>
                )}
              </h1>
              {nameChangeError && (
                <p className="error-text">{nameChangeError}</p>
              )}
              {isEditMode ? (
                <>
                  <form onSubmit={handleChangeName} className="edit-form">
                    <div className="edit-section">
                      <input
                        required
                        min={2}
                        placeholder={firstName}
                        name="firstName"
                        aria-label="first name"
                        className="edit-field"
                      />
                      <input
                        required
                        min={2}
                        placeholder={lastName}
                        name="lastName"
                        aria-label="last name"
                        className="edit-field"
                      />
                    </div>
                    <div className="edit-section">
                      <button
                        type="submit"
                        className="edit-button edit-button-control"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="edit-button edit-button-control edit-button-cancel"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => setEditMode(true)}
                >
                  Edit Name
                </button>
              )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">
                  Argent Bank Credit Card (x8349)
                </h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default Profile;
