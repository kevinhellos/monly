"use client"

import ProtectedRoute from "../(auth)/ProtectedRoute";
import Container from "../(components)/Container";
import Navbar from "../(components)/Navbar";

export default function Dashboardlayout({ children } : {  children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <Container>
        <Navbar/>
        {children}
      </Container>
    </ProtectedRoute>
  );
}