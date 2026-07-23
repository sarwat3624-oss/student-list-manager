function Settings({
  academyName,
  setAcademyName,
  adminName,
  setAdminName,
}) {
  function saveSettings() {
    const newAcademyName = academyName.trim();
    const newAdminName = adminName.trim();

    if (!newAcademyName) {
      alert("Please enter academy name.");
      return;
    }

    if (!newAdminName) {
      alert("Please enter admin name.");
      return;
    }

    localStorage.setItem(
      "academyName",
      newAcademyName
    );

    localStorage.setItem(
      "adminName",
      newAdminName
    );

    setAcademyName(newAcademyName);
    setAdminName(newAdminName);

    alert("Settings saved successfully!");
  }

  return (
    <section className="settings-page">

      <div className="page-header">

        <div>
          <span>
            STUDENT MANAGEMENT
          </span>

          <h1>
            Settings ⚙️
          </h1>

          <p>
            Manage your student management system.
          </p>
        </div>

      </div>

      <div className="settings-card">

        <div className="settings-card-header">

          <div>
            <span>
              GENERAL SETTINGS
            </span>

            <h2>
              Academy Information
            </h2>
          </div>

        </div>

        <div className="setting-item">

          <label>
            Academy Name
          </label>

          <input
            type="text"
            value={academyName}
            onChange={(e) =>
              setAcademyName(e.target.value)
            }
          />

        </div>

        <div className="setting-item">

          <label>
            Admin Name
          </label>

          <input
            type="text"
            value={adminName}
            onChange={(e) =>
              setAdminName(e.target.value)
            }
          />

        </div>

        <button
          type="button"
          className="save-settings-btn"
          onClick={saveSettings}
        >
          💾 Save Settings
        </button>

      </div>

      <div className="settings-preview">

        <span>
          CURRENT SETTINGS
        </span>

        <h2>
          {academyName}
        </h2>

        <p>
          Administrator: {adminName}
        </p>

      </div>

    </section>
  );
}

export default Settings;