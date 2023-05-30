import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import TextField from "@mui/material/TextField";
import MDButton from "components/MDButton";

import Button from "@mui/material/Button";

function Dashboard() {
  const [clubCount, setClubCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [clinicCount, setClinicCount] = useState(0);
  const [physioClinicCount, setPhysioClinicCount] = useState(0);
  const [newClub, setNewClub] = useState({
    name: "",
    description: "",
    governorate: "",
    street: "",
  });
  const [newClinic, setNewClinic] = useState({
    name: "",
    description: "",
    governorate: "",
    street: "",
  });
  const [newPhyClinic, setNewPhyClinic] = useState({
    name: "",
    description: "",
    governorate: "",
    street: "",
  });
  useEffect(() => {
    // Fetch club count
    fetch("https://nutrigym.onrender.com/api/v1/club")
      .then((response) => response.json())
      .then((data) => {
        const clubCount = data.result;
        if (!data.result) {
          setClubCount(0);
        } else {
          setClubCount(clubCount);
        }
      })
      .catch((error) => {
        console.error("Error fetching club count:", error);
      });

    // Fetch product count
    fetch("https://nutrigym.onrender.com/api/v1/prod")
      .then((response) => response.json())
      .then((data) => {
        const productCount = data.result;
        if (!data.result) {
          setProductCount(0);
        } else {
          setProductCount(productCount);
        }
      })
      .catch((error) => {
        console.error("Error fetching product count:", error);
      });

    // Fetch clinic count
    fetch("https://nutrigym.onrender.com/api/v1/clinc")
      .then((response) => response.json())
      .then((data) => {
        const clinicCount = data.result;
        if (!data.result) {
          setClinicCount(0);
        } else {
          setClinicCount(clinicCount);
        }
      })
      .catch((error) => {
        console.error("Error fetching clinic count:", error);
      });

    // Fetch physiotherapy clinic count
    fetch("https://nutrigym.onrender.com/api/v1/phyclinic")
      .then((response) => response.json())
      .then((data) => {
        const physioClinicCount = data.result;
        if (!data.result) {
          setPhysioClinicCount(0);
        } else {
          setPhysioClinicCount(physioClinicCount);
        }
      })
      .catch((error) => {
        console.error("Error fetching physiotherapy clinic count:", error);
      });
  }, []);

  const handleAddClub = (event) => {
    event.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Set the headers with the token
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Send a POST request to add the new club
    fetch("https://nutrigym.onrender.com/api/v1/club", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newClub),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log("New club added:", data);
        // Reset the form and update the club count
        setNewClub({
          name: "",
          description: "",
          governorate: "",
          street: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new club:", error);
      });
    console.log(setNewClub);
  };

  const handleAddClinic = (event) => {
    event.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Create the headers for the request
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the API request to add a new clinic
    fetch("https://nutrigym.onrender.com/api/v1/clinc", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newClinic),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New clinic added:", data);
        setNewClinic({
          name: "",
          description: "",
          governorate: "",
          street: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new clinic:", error);
      });
  };

  const handleAddPhyClinic = (event) => {
    event.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Create the headers for the request
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the API request to add a new physiotherapy clinic
    fetch("https://nutrigym.onrender.com/api/v1/phyclinic", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(newPhyClinic),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New physiotherapy clinic added:", data);
        setNewPhyClinic({
          name: "",
          description: "",
          governorate: "",
          street: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new physiotherapy clinic:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewClub((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleClinicInputChange = (event) => {
    const { name, value } = event.target;
    setNewClinic((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePhyClinicInputChange = (event) => {
    const { name, value } = event.target;
    setNewPhyClinic((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Clubs"
                count={clubCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Clinics"
                count={clinicCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Physiotherapy clinic"
                count={physioClinicCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Products"
                count={productCount}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <form onSubmit={handleAddClub}>
                  <MDBox
                    color="white"
                    bgColor="white"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={2}
                  >
                    <MDBox mt={2.5}>
                      <TextField
                        label="Club Name"
                        name="name"
                        value={newClub.name}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Description"
                        name="description"
                        value={newClub.description}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Governorate"
                        name="governorate"
                        value={newClub.governorate}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="Street"
                        name="street"
                        value={newClub.street}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDButton
                      type="submit"
                      variant="contained"
                      color="info"
                      fullWidth
                    >
                      Add Club
                    </MDButton>
                  </MDBox>
                </form>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <form onSubmit={handleAddClinic}>
                  <MDBox
                    color="white"
                    bgColor="white"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={2}
                  >
                    <MDBox mt={2.5}>
                      <TextField
                        label="Clinic Name"
                        name="name"
                        value={newClinic.name}
                        onChange={handleClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Description"
                        name="description"
                        value={newClinic.description}
                        onChange={handleClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Governorate"
                        name="governorate"
                        value={newClinic.governorate}
                        onChange={handleClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="Street"
                        name="street"
                        value={newClinic.street}
                        onChange={handleClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDButton
                      type="submit"
                      variant="contained"
                      color="info"
                      fullWidth
                    >
                      Add Clinic
                    </MDButton>
                  </MDBox>
                </form>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <form onSubmit={handleAddPhyClinic}>
                  <MDBox
                    color="white"
                    bgColor="white"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={2}
                  >
                    <MDBox mt={2.5}>
                      <TextField
                        label="Physiotherapy clinic Name"
                        name="name"
                        value={newPhyClinic.name}
                        onChange={handlePhyClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Description"
                        name="description"
                        value={newPhyClinic.description}
                        onChange={handlePhyClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Governorate"
                        name="governorate"
                        value={newPhyClinic.governorate}
                        onChange={handlePhyClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="Street"
                        name="street"
                        value={newPhyClinic.street}
                        onChange={handlePhyClinicInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDButton
                      type="submit"
                      variant="contained"
                      color="info"
                      fullWidth
                    >
                      Add PhyClinic
                    </MDButton>
                  </MDBox>
                </form>
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <form onSubmit={handleAddClub}>
                  <MDBox
                    color="white"
                    bgColor="white"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={2}
                  >
                    <MDBox mt={2.5}>
                      <TextField
                        label="Product Name"
                        name="name"
                        value={newClub.name}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Description"
                        name="description"
                        value={newClub.description}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5}>
                      <TextField
                        label="Governorate"
                        name="governorate"
                        value={newClub.governorate}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox mt={2.5} mb={2.5}>
                      <TextField
                        label="Street"
                        name="street"
                        value={newClub.street}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </MDBox>
                    <MDButton variant="contained" color="info" fullWidth>
                      Button
                    </MDButton>
                  </MDBox>
                </form>
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      {/* Rest of the code */}
    </DashboardLayout>
  );
}

export default Dashboard;
