import React from "react";
import HomeCourses from "../components/Web/HomeCourses";
import HowCoursesWork from "../components/Web/HowCoursesWork";
import ReviewCoruses from "../components/Web/ReviewCoruses";
import MainBanner from "../components/Web/SocialLinks/MainBanner";


export default function Home() {
  return (
    <>
    <MainBanner />
    <HomeCourses />
    <HowCoursesWork />
    <ReviewCoruses />
    </>
  );
}
