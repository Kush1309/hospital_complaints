function submitComplaint() {
  const name = document.getElementById("name").value;
  const issue = document.getElementById("issue").value;

  fetch("/complaints", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, issue })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("msg").innerText =
      "Complaint submitted successfully. ID: " + data.id;
  });
}

function loadComplaints() {
  fetch("/complaints")
    .then(res => res.json())
    .then(data => {
      const box = document.getElementById("complaints");
      box.innerHTML = "";

      data.forEach(c => {
        box.innerHTML += `
          <div class="complaint">
            <h3>${c.name}</h3>
            <p>${c.issue}</p>
            <span class="status ${c.status}">${c.status}</span>

            <select onchange="updateStatus(${c.id}, this.value)">
              <option value="pending">pending</option>
              <option value="resolved">resolved</option>
              <option value="rejected">rejected</option>
            </select>

            <button style="margin-top:10px;background:#d32f2f"
              onclick="deleteComplaint(${c.id})">Delete</button>
          </div>
        `;
      });
    });
}

function updateStatus(id, status) {
  fetch(`/complaints/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
}

function deleteComplaint(id) {
  fetch(`/complaints/${id}`, { method: "DELETE" })
    .then(() => loadComplaints());
}

function goToAdmin() {
  window.location.href = "admin.html";
}

function drawChart(data) {
  let pending = 0, resolved = 0, rejected = 0;

  data.forEach(c => {
    if (c.status === "pending") pending++;
    if (c.status === "resolved") resolved++;
    if (c.status === "rejected") rejected++;
  });

  const ctx = document.getElementById("statusChart").getContext("2d");

  if (window.myChart) window.myChart.destroy(); // avoid duplicate chart

  window.myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Pending", "Resolved", "Rejected"],
      datasets: [{
        data: [pending, resolved, rejected],
        backgroundColor: ["#ffca28", "#66bb6a", "#ef5350"]
      }]
    }
  });
}
