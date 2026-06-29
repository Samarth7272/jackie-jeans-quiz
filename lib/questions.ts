export const questions = [
  {
    id: 1,
    question: "What is your height?",
    type: "dropdown",
    optional: false,
    options: ["4'10\"","4'11\"","5'0\"","5'1\"","5'2\"",
              "5'3\"","5'4\"","5'5\"","5'6\"","5'7\"",
              "5'8\"","5'9\"","5'10\"","5'11\"","6'0\"",
              "6'1\"","6'2\""]
  },
  {
    id: 2,
    question: "What is your weight? (Optional — you can skip)",
    type: "number",
    optional: true,
    placeholder: "Enter weight in lbs"
  },
  {
    id: 3,
    question: "Waist measurement in inches (narrowest point)?",
    type: "dropdown",
    optional: false,
    options: ["24\"","25\"","26\"","27\"","28\"","29\"",
              "30\"","31\"","32\"","33\"","34\"","35\"",
              "36\"","37\"","38\"","39\"","40\"","41\"",
              "42\"","43\"","44\"","45\"","46\"","47\"",
              "48\"","49\"","50\"","51\"","52\""]
  },
  {
    id: 4,
    question: "Hip measurement in inches (fullest point)?",
    type: "dropdown",
    optional: false,
    options: ["32\"","33\"","34\"","35\"","36\"","37\"",
              "38\"","39\"","40\"","41\"","42\"","43\"",
              "44\"","45\"","46\"","47\"","48\"","49\"",
              "50\"","51\"","52\"","53\"","54\"","55\"",
              "56\"","57\"","58\"","59\"","60\""]
  },
  {
    id: 5,
    question: "How do you like jeans to fit at the waist?",
    type: "single-select",
    optional: false,
    options: ["Snug","Slightly relaxed","Relaxed"]
  },
  {
    id: 6,
    question: "Where should the waistband sit?",
    type: "single-select",
    optional: false,
    options: ["High rise","Mid rise","Low rise"]
  },
  {
    id: 7,
    question: "How should jeans fit through the thighs?",
    type: "single-select",
    optional: false,
    options: ["Fitted","Relaxed","Loose"]
  },
  {
    id: 8,
    question: "Which denim brands have you bought before?",
    type: "multi-select",
    optional: false,
    options: ["Levi's","Wrangler","Gap","H&M","Zara",
              "Madewell","AG Jeans","7 For All Mankind",
              "Citizens of Humanity","Topshop","ASOS",
              "American Eagle","Abercrombie","Uniqlo",
              "Calvin Klein","Tommy Hilfiger","Guess",
              "Lucky Brand","Paige","Frame"]
  },
  {
    id: 9,
    question: "What size did you buy in those brands?",
    type: "brand-sizes",
    optional: false,
    options: []
  },
  {
    id: 10,
    question: "Biggest fit frustration when buying jeans?",
    type: "multi-select",
    optional: false,
    options: ["Waist gap","Hip tightness","Wrong length",
              "Thigh fit","Rise","Other"]
  }
]

export const brandSizes = [
  "XS","S","M","L","XL","XXL",
  "24","25","26","27","28","29",
  "30","31","32","33","34"
]