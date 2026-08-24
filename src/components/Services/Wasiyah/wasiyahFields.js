export const wasiyahSections = [
  {
    id: "applicant",
    title: "Applicant Info / 申請者情報",
    description:
      "Please provide your personal information.",

    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "input",
        required: true,
      },

      {
        name: "japaneseName",
        label: "Japanese Name",
        type: "input",
      },
       {
        name: "fatherName",
        label: "Father’s name",
        type: "input",
      },
       {
        name: "passportNo",
        label: "Passport No",
        type: "input",
      },
       {
        name: "idCardNo",
        label: "I.D card No",
        type: "input",
      },

      {
        name: "dateOfBirth",
        label: "Date of Birth",
        type: "input",
        inputType: "date",
        required: true,
      },

      {
        name: "gender",
        label: "Gender",
        type: "select",
        required: true,
        options: [
          {
            value: "male",
            label: "Male",
          },
          {
            value: "female",
            label: "Female",
          },
        ],
      },

      {
        name: "nationality",
        label: "Nationality",
        type: "input",
        required: true,
      },

      {
        name: "phone",
        label: "Phone Number",
        type: "input",
        inputType: "tel",
        required: true,
      },

      {
        name: "email",
        label: "Email Address",
        type: "input",
        inputType: "email",
        required: true,
      },

      {
        name: "currentCity",
        label: "Current City / Prefecture",
        type: "input",
      },

      {
        name: "addressInJapan",
        label: "Address in Japan",
        type: "textarea",
        required: true,
        fullWidth: true,
      },
    ],
  },

  {
    id: "islamic",
    title: "Islamic Information / イスラームに関する情報",
    description:
      "Please provide your Islamic information.",

    fields: [
      {
        name: "muslimName",
        label: "Muslim Name",
        type: "input",
      },

      {
        name: "shahadahDate",
        label: "Date of Shahadah",
        type: "input",
        inputType: "date",
      },

      {
        name: "shahadahLocation",
        label: "Location of Shahadah",
        type: "input",
      },

      {
        name: "community",
        label: "Masjid / Community Affiliation",
        type: "input",
      },

      {
        name: "preferredBurialArrangement",
        label: "Preferred Islamic Burial Arrangement",
        type: "textarea",
        fullWidth: true,
      },
    ],
  },

  {
    id: "burial",
    title: "Burial Wishes / 埋葬に関する希望",
    description:
      "Select your preferred Islamic funeral and burial arrangements.",

    fields: [
      {
        name: "ghusl",
        label: "Ghusl (Washing)",
        type: "checkbox",
      },

      {
        name: "kafan",
        label: "Kafan",
        type: "checkbox",
      },

      {
        name: "janazah",
        label: "Janazah Prayer",
        type: "checkbox",
      },

      {
        name: "muslimCemetery",
        label: "Muslim Cemetery",
        type: "checkbox",
      },

      {
        name: "burialInJapan",
        label: "Burial in Japan",
        type: "checkbox",
      },

      {
        name: "burialOutsideJapan",
        label: "Burial Outside Japan",
        type: "checkbox",
      },

      {
        name: "noCremation",
        label: "No Cremation",
        type: "checkbox",
      },

      {
        name: "osakaMasjidAssistance",
        label: "Osaka Masjid Funeral Assistance",
        type: "checkbox",
      },

      {
        name: "otherBurialWishes",
        label: "Other Wishes",
        type: "textarea",
        fullWidth: true,
      },
    ],
  },

  {
    id: "emergency",
    title: "Emergency Contact / 緊急連絡先",
    description:
      "Provide people who can be contacted when necessary.",

    fields: [
      {
        name: "contact1Name",
        label: "Contact 1 - Full Name",
        type: "input",
        required: true,
      },

      {
        name: "contact1Relationship",
        label: "Contact 1 - Relationship",
        type: "input",
        required: true,
      },

      {
        name: "contact1Phone",
        label: "Contact 1 - Phone",
        type: "input",
        inputType: "tel",
        required: true,
      },

      {
        name: "contact1Email",
        label: "Contact 1 - Email",
        type: "input",
        inputType: "email",
      },

      {
        name: "contact1Address",
        label: "Contact 1 - Address",
        type: "textarea",
        fullWidth: true,
      },

      {
        name: "contact2Name",
        label: "Contact 2 - Full Name",
        type: "input",
      },

      {
        name: "contact2Relationship",
        label: "Contact 2 - Relationship",
        type: "input",
      },

      {
        name: "contact2Phone",
        label: "Contact 2 - Phone",
        type: "input",
        inputType: "tel",
      },

      {
        name: "contact2Email",
        label: "Contact 2 - Email",
        type: "input",
        inputType: "email",
      },

      {
        name: "contact2Address",
        label: "Contact 2 - Address",
        type: "textarea",
        fullWidth: true,
      },
    ],
  },

  // {
  //   id: "authorized",
  //   title: "Authorized Person to Contact Osaka Masjid / 大阪モスク連絡担当者",
  //   description:
  //     "Specify who may coordinate with Osaka Masjid after your death.",

  //   fields: [
  //     {
  //       name: "authorizedName",
  //       label: "Full Name",
  //       type: "input",
  //     },

    
  //     {
  //       name: "authorizedPhone",
  //       label: "Phone",
  //       type: "input",
  //       inputType: "tel",
  //     },

  //     {
  //       name: "authorizedEmail",
  //       label: "Email",
  //       type: "input",
  //       inputType: "email",
  //     },
  //       {
  //       name: "position",
  //       label: "Position",
  //       type: "input",
  //       inputType: "email",
  //     },

  //     {
  //       name: "immediateContactAuthorization",
  //       label:
  //         "Authorized to contact Osaka Masjid immediately after death",
  //       type: "checkbox",
  //       fullWidth: true,
  //     },

  //     {
  //       name: "funeralArrangementAuthorization",
  //       label:
  //         "Authorized to discuss funeral / burial arrangements",
  //       type: "checkbox",
  //       fullWidth: true,
  //     },
  //   ],
  // },

  {
    id: "religious",
    title: "Religious Matters / 宗教に関する事項",
    description:
      "Provide information related to your religious obligations.",

    // fields: [
    //   {
    //     name: "missedSalah",
    //     label: "Missed Salah",
    //     type: "textarea",
    //     fullWidth: true,
    //   },

    //   {
    //     name: "fasting",
    //     label: "Fasting",
    //     type: "textarea",
    //     fullWidth: true,
    //   },

    //   {
    //     name: "zakah",
    //     label: "Zakah",
    //     type: "textarea",
    //     fullWidth: true,
    //   },

    //   {
    //     name: "hajj",
    //     label: "Hajj",
    //     type: "textarea",
    //     fullWidth: true,
    //   },

    //   {
    //     name: "fidyaKaffarah",
    //     label: "Fidya / Kaffarah",
    //     type: "textarea",
    //     fullWidth: true,
    //   },

    //   {
    //     name: "sadaqahInstructions",
    //     label: "Sadaqah / Nafli Sadaqaat Instructions",
    //     type: "textarea",
    //     fullWidth: true,
    //   },
    // ],
    fields: [
  {
    name: "missedSalahFajr",
    label: "Missed Salah - Fajr",
    type: "input",
    fullWidth: true,
  },
  {
    name: "missedSalahDhuhr",
    label: "Missed Salah - Dhuhr",
    type: "input",
    fullWidth: true,
  },
  {
    name: "missedSalahAsr",
    label: "Missed Salah - Asr",
    type: "input",
    fullWidth: true,
  },
  {
    name: "missedSalahMaghrib",
    label: "Missed Salah - Maghrib",
    type: "input",
    fullWidth: true,
  },
  {
    name: "missedSalahIsha",
    label: "Missed Salah - Isha",
    type: "input",
    fullWidth: true,
  },

  {
    name: "fasting",
    label: "Fasting",
    type: "input",
    fullWidth: true,
  },

  {
    name: "zakah",
    label: "Zakah",
    type: "input",
    fullWidth: true,
  },

  {
    name: "hajj",
    label: "Hajj",
    type: "input",
    fullWidth: true,
  },

  {
    name: "fidyaKaffarah",
    label: "Fidya / Kaffarah",
    type: "input",
    fullWidth: true,
  },

  {
    name: "sadaqahInstructions",
    label: "Sadaqah / Nafli Sadaqaat Instructions",
    type: "input",
    fullWidth: true,
  },
]
  },

  {
    id: "japanBurial",
    title: "Japan-Specific Burial Information / 日本における埋葬に関する情報",
    description:
      "Provide information about your preferred cemetery and burial reservation.",

    fields: [
      {
        name: "preferredMuslimCemetery",
        label: "Preferred Muslim Cemetery",
        type: "input",
      },

      {
        name: "preferredBurialLocation",
        label: "Preferred Burial Location",
        type: "input",
      },

      {
        name: "hasBurialReservation",
        label: "Do you have a burial reservation?",
        type: "select",
        options: [
          {
            value: "yes",
            label: "Yes",
          },
          {
            value: "no",
            label: "No",
          },
        ],
      },

      {
        name: "cemeteryName",
        label: "Cemetery Name ( if burial have reservation )",
        type: "input",
      },

      {
        name: "reservationNumber",
        label: "Reservation / Reference Number ( if burial have reservation )",
        type: "input",
      },
    ],
  },

  {
    id: "confirmation",
    title: "Final Confirmation / 最終確認",
    description:
      "Please review your information before submitting your Wasiyah.",

    fields: [
    //   {
    //     name: "confirmationName",
    //     label: "Full Name",
    //     type: "input",
    //     required: true,
    //   },

      {
        name: "signature",
        label: "Signature (Upload Image/PDF)",
        type: "file",
        accept: "image/*,.pdf",
        required: true,
      },

      {
        name: "confirmationDate",
        label: "Date",
        type: "input",
        inputType: "date",
        required: true,
      },

      {
        name: "confirmation",
        label:
          "I confirm that the information and wishes provided in this Wasiyah application represent my current wishes.",
        type: "checkbox",
        fullWidth: true,
      },
    ],
  },
];