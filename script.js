document.getElementById("visa-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const durationYears = parseInt(document.getElementById("durationYears").value);
  const totalMonths = durationYears * 12;
  const location = document.getElementById("location").value;
  const onList = document.getElementById("onList").checked;
  const numAdultDependants = parseInt(document.getElementById("adultDeps").value);
  const numChildDependants = parseInt(document.getElementById("childDeps").value);

  // --- Certificate of Sponsorship ---
  const cos = 525;

  // --- Immigration Skills Charge (main applicant only) ---
  let isc = 1000;
  if (totalMonths > 12) {
    const extraMonths = totalMonths - 12;
    const extraBlocks = Math.ceil(extraMonths / 6);
    isc += extraBlocks * 500;
  }

  // --- Application Fee (standard = up to 3 years, long-stay = over 3 years) ---
  const isLongStay = durationYears > 3;
  let appFee;
  if (onList) {
    appFee = isLongStay ? 1235 : 628;
  } else if (location === "outside") {
    appFee = isLongStay ? 1618 : 819;
  } else {
    appFee = isLongStay ? 1865 : 943;
  }

  // --- Dependant application fees (same rate as main applicant) ---
  const depAppFee = (numAdultDependants + numChildDependants) * appFee;

  // --- Immigration Health Surcharge ---
  const mainIHS = durationYears * 1035;
  const adultDepIHS = numAdultDependants * durationYears * 1035;
  const childDepIHS = numChildDependants * durationYears * 776;

  const total = cos + isc + appFee + depAppFee + mainIHS + adultDepIHS + childDepIHS;

  document.getElementById("results").innerHTML = `
    <h2>Cost Breakdown</h2>
    <p><strong>Certificate of Sponsorship:</strong> £${cos}</p>
    <p><strong>Immigration Skills Charge:</strong> £${isc}</p>
    <p><strong>Application Fee (main applicant):</strong> £${appFee} ${isLongStay ? "(long-stay rate)" : "(standard rate)"}</p>
    <p><strong>Application Fee (dependants):</strong> £${depAppFee}</p>
    <p><strong>Main Applicant IHS:</strong> £${mainIHS}</p>
    <p><strong>Dependants IHS:</strong> £${adultDepIHS + childDepIHS}</p>
    <hr>
    <h3><strong>Total: £${total}</strong></h3>
  `;
});
