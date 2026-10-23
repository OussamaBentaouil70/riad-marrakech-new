import heroImage from "../../images/Hero image.jpg";
import contactImage from "../../images/Your Marrakech Experience Starts Here.jpg";

import almahaCover from "../../images/Almaha Marrakech.jpg";
import noaCover from "../../images/Riad Noa Marrakech.jpg";
import ziriCover from "../../images/Maison Ziri.jpg";
import neliaCover from "../../images/Nelia Marrakech.jpg";

import completePrivacy from "../../images/Complete Privacy.jpg";
import stayTogether from "../../images/Stay Together.jpg";
import tailoredCelebrations from "../../images/Tailored Celebrations.png";
import seamlessPlanning from "../../images/Seamless Planning.jpg";

import intimateWeddings from "../../images/Intimate Weddings.jpg";
import birthdayParties from "../../images/Birthday Parties.jpg";
import marriageProposals from "../../images/Marriage Proposals.jpg";
import engagementParties from "../../images/Engagement Parties.jpg";
import privateDinnerParties from "../../images/Private Dinner Parties.jpg";
import bachelorParties from "../../images/Bachelor & Bachelorette Parties.jpg";
import honeymoonCelebrations from "../../images/Honeymoon Celebrations.jpg";
import rooftopDinners from "../../images/Romantic Rooftop Dinners.jpg";
import wellnessRetreats from "../../images/Wellness & Yoga Retreats.jpg";
import privateCooking from "../../images/Private Cooking Experiences.jpg";
import businessMeetings from "../../images/Business Meetings & Workshops.jpg";
import fashionShows from "../../images/Fashion Shows & Photoshoots.jpg";

import exploreMarrakech from "../../images/Explore Marrakech – Culture, Adventure & Luxury.jpg";
import cookingClasses from "../../images/Moroccan Cooking Classes & Culinary Workshops.jpg";
import privateShopping from "../../images/Private Shopping in the Marrakech Medina.jpg";
import potteryWorkshops from "../../images/Pottery & Moroccan Craft Workshops.jpg";
import hotAirBalloon from "../../images/Hot Air Balloon Experience.jpg";
import quadBiking from "../../images/Quad Biking Adventures.jpg";
import camelRides from "../../images/Sunset Camel Rides.jpg";
import agafayDesert from "../../images/Agafay Desert Experiences.jpg";
import rooftopYoga from "../../images/Private Rooftop Yoga Classes.jpg";

import almahaRooftopTable from "../../images/RIADS/almaha/Almaha_1.webp";
import almahaRooftopLounge from "../../images/RIADS/almaha/Almaha_Mars_2.webp";
import almahaDiningRoom from "../../images/RIADS/almaha/Almaha_Mars_3.webp";
import almahaHammam from "../../images/RIADS/almaha/almaha_4.webp";

import noaPoolChairs from "../../images/RIADS/riad noa/437afa02-a115-4df8-b912-797b5ea42249.avif";
import noaCourtyard from "../../images/RIADS/riad noa/803c4552-6ff6-4f0f-b4be-58084512c2c3.avif";
import noaSalon from "../../images/RIADS/riad noa/ce6507eb-d45b-484e-b743-0567adcf08c5.avif";
import noaCourtyardDusk from "../../images/RIADS/riad noa/f65063af-14af-42bc-a4aa-5e62d15fcc4c.avif";

import ziriCourtyard from "../../images/RIADS/maison ziri/unnamed.webp";
import ziriSuite from "../../images/RIADS/maison ziri/unnamed (1).webp";
import ziriRoofTerrace from "../../images/RIADS/maison ziri/unnamed (2).webp";
import ziriPlaque from "../../images/RIADS/maison ziri/unnamed (3).webp";

import neliaRooftopDrinks from "../../images/RIADS/nelia/AMG09377.avif";
import neliaPool from "../../images/RIADS/nelia/AMG09845_edited.avif";
import neliaBedroom from "../../images/RIADS/nelia/AMG09895.avif";
import neliaPoolDeck from "../../images/RIADS/nelia/DSC08538.avif";

import logoRiad from "../../images/logo_riad.png";
import logoTabIcon from "../../images/logo icon tab.png";

export { heroImage, contactImage };

export const riadImages: Record<string, string> = {
  almaha: almahaCover,
  "riad-noa": noaCover,
  "maison-ziri": ziriCover,
  "nelia-marrakech": neliaCover,
};

export const buyoutImages: Record<string, string> = {
  "Complete Privacy": completePrivacy,
  "Stay Together": stayTogether,
  "Tailored Celebrations": tailoredCelebrations,
  "Seamless Planning": seamlessPlanning,
};

export const eventImages: Record<string, string> = {
  "Intimate Weddings": intimateWeddings,
  "Birthday Parties": birthdayParties,
  "Marriage Proposals": marriageProposals,
  "Engagement Parties": engagementParties,
  "Private Dinner Parties": privateDinnerParties,
  "Bachelor & Bachelorette Parties": bachelorParties,
  "Honeymoon Celebrations": honeymoonCelebrations,
  "Romantic Rooftop Dinners": rooftopDinners,
  "Wellness & Yoga Retreats": wellnessRetreats,
  "Private Cooking Experiences": privateCooking,
  "Business Meetings & Workshops": businessMeetings,
  "Fashion Shows & Photoshoots": fashionShows,
};

export const experienceImages: Record<string, string> = {
  "Explore Marrakech": exploreMarrakech,
  "Cooking Classes & Culinary Workshops": cookingClasses,
  "Private Shopping in the Medina": privateShopping,
  "Pottery & Moroccan Craft Workshops": potteryWorkshops,
  "Hot Air Balloon at Sunrise": hotAirBalloon,
  "Quad Biking Adventures": quadBiking,
  "Sunset Camel Rides": camelRides,
  "Agafay Desert Experiences": agafayDesert,
  "Private Rooftop Yoga": rooftopYoga,
};

/** Secondary gallery photos per riad (shown after the cover in the gallery modal). */
export const riadGalleryImages: Record<string, string[]> = {
  almaha: [almahaRooftopTable, almahaRooftopLounge, almahaDiningRoom, almahaHammam],
  "riad-noa": [noaPoolChairs, noaCourtyard, noaSalon, noaCourtyardDusk],
  "maison-ziri": [ziriCourtyard, ziriSuite, ziriRoofTerrace, ziriPlaque],
  "nelia-marrakech": [neliaRooftopDrinks, neliaPool, neliaBedroom, neliaPoolDeck],
};

export const logos = {
  brand: logoRiad,
  favicon: logoTabIcon,
};
