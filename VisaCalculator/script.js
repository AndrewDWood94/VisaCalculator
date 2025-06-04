document.getElementById("visa-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const durationYears = parseInt(document.getElementById("durationYears").value);
  const totalMonths = durationYears * 12;

  const location = document.getElementById("location").value;
  const onList = document.getElementById("onList").checked;
  const numAdultDependants = parseInt(document.getElementById("adultDeps").value);
  const numChildDependants = parseInt(document.getElementById("childDeps").value);

  // Certificate of Sponsorship
  const cos = 525;

  // Immigration Skills Charge (main applicant only)
  let isc = 1000;
  if (totalMonths > 12) {
    const extraMonths = totalMonths - 12;
    const extraBlocks = Math.ceil(extraMonths / 6);
    isc += extraBlocks * 500;
  }

  // Application Fee
  let appFee;
  if (onList) {
    appFee = 590;
  } else if (location === "outside") {
    appFee = 769;
  } else {
    appFee = 885;
  }

  // Immigration Health Surcharge
  const mainIHS = durationYears * 1035;
  const adultDepIHS = numAdultDependants * durationYears * 1035;
  const childDepIHS = numChildDependants * durationYears * 776;

  const total = cos + isc + appFee + mainIHS + adultDepIHS + childDepIHS;

  document.getElementById("results").innerHTML = `
    <h2>Cost Breakdown</h2>
    <p><strong>Certificate of Sponsorship:</strong> £${cos}</p>
    <p><strong>Immigration Skills Charge:</strong> £${isc}</p>
    <p><strong>Application Fee:</strong> £${appFee}</p>
    <p><strong>Main Applicant IHS:</strong> £${mainIHS}</p>
    <p><strong>Dependants IHS:</strong> £${adultDepIHS + childDepIHS}</p>
    <hr>
    <h3><strong>Total: £${total}</strong></h3>
  `;
});
