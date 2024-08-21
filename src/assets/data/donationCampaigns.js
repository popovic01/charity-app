export const donationCampaigns = [
  {
    id: 1,
    name: 'Empowering Indigenous Education',
    averageRating: 4.33,
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    description:
      'Providing scholarships and resources to Indigenous students to help them achieve their educational goals.',
    userRatings: [
      { email: 'john@example.com', rating: 5 },
      { email: 'alice@example.com', rating: 4 },
      { email: 'katherina@example.com', rating: 4 }
    ]
  },
  {
    id: 2,
    name: 'Clean Water for Indigenous Villages',
    averageRating: 0,
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    description:
      'Ensuring access to clean and safe drinking water in remote Indigenous communities.',
    userRatings: []
  },
  {
    id: 3,
    name: 'Indigenous Mental Health Support',
    averageRating: 4.66,
    startDate: '2023-06-15',
    endDate: '2024-06-15',
    description:
      'Providing mental health services and resources to support the well-being of Indigenous peoples.',
    userRatings: [
      { email: 'jane@example.com', rating: 4 },
      { email: 'alice@example.com', rating: 5 },
      { email: 'john@example.com', rating: 5 }
    ]
  },
  {
    id: 4,
    name: 'Indigenous Health and Wellness Fund',
    averageRating: 4,
    startDate: '2023-09-01',
    endDate: '2024-09-01',
    description:
      'Supporting healthcare initiatives in Indigenous communities to improve access to essential services.',
    userRatings: [
      { email: 'jane@example.com', rating: 5 },
      { email: 'alice@example.com', rating: 3 }
    ],
    images: [
      {
        itemImageSrc: '../../../src/assets/images/aborigines.jpg',
        alt: 'slika 5',
        title: 'Title for the first picture'
      },
      {
        itemImageSrc: '../../../src/assets/images/aborigines.jpg',
        alt: 'slika 2',
        title: 'Title for the second picture'
      },
      {
        itemImageSrc: '../../../src/assets/images/aborigines.jpg',
        alt: 'slika 3',
        title: 'Title for the third picture'
      }
    ]
  },
  {
    id: 5,
    name: 'Revitalizing Indigenous Agriculture',
    averageRating: 3,
    startDate: '2024-02-01',
    endDate: '2024-12-01',
    description:
      'Supporting traditional farming practices and sustainable agriculture in Indigenous communities.',

    userRatings: [{ email: 'alice@example.com', rating: 3 }]
  }
]
