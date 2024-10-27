# AI-Driven Healthcare Platform

A Next.js-based medical referral system that uses AI to streamline the connection between patients and specialists, developed for the Faithbase HackTech Challenge.

## Problem Statement

In healthcare systems worldwide, particularly in Romania, the referral process between primary care physicians and specialists faces significant challenges:

- Inefficient medical referrals
- Redundant testing and diagnosis
- Delays in treatment for critical conditions
- Poor patient outcomes due to lack of timely specialist care

These issues not only affect patient health but also contribute to healthcare system inefficiencies, increasing costs and resource strain.

## Solution Overview

Our AI-powered medical referral system streamlines and automates the referral process using advanced machine learning models, including BERT and integration with OpenAI's capabilities.

### Key Features

#### For Patients

- **Smart Account Management:** Secure patient portal for managing medical information
- **AI-Powered Symptom Analysis:**
  - Utilizes a custom BERT model trained on the SymptomsDisease246k dataset
  - Processes patient symptoms to suggest potential diagnoses
- **Intelligent Specialist Matching:** Recommends appropriate specialists based on AI analysis
- **Secure Medical Record Management:** Complete control over personal health information sharing

#### For Specialists

- **Professional Dashboard:** Comprehensive view of patient referrals and appointments
- **Patient History Access:** Secure access to shared patient records
- **Schedule Optimization:** AI-driven appointment scheduling based on urgency and availability

### Technical Implementation

#### Machine Learning Model

- **Dataset:** [SymptomsDisease246k](https://huggingface.co/datasets/fhai50032/SymptomsDisease246k)
  - 246,000+ symptom-disease pairs
  - Used for training our BERT model in symptom analysis
- **Model Architecture:**
  - Fine-tuned BERT model for symptom classification
  - Custom tokenization and preprocessing pipeline
  - Weighted prediction system for accurate disease prediction

#### Tech Stack

- Next.js for frontend and API routes
- BERT model for symptom analysis
- OpenAI integration for advanced diagnostics
- Secure authentication and data encryption

## Getting Started

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Future Roadmap

- OCR integration for paper document digitization
- Telehealth platform integration
- Personalized treatment plan generation
- Medication management system
- Real-time symptom tracking

## Benefits

- **Faster Care Access:** Streamlined referral process for timely specialist care
- **Reduced Administration:** Automated processes save time for healthcare providers
- **Improved Accuracy:** AI-driven matching ensures appropriate specialist referrals
- **Better Resource Management:** Optimized scheduling and resource allocation
- **Enhanced Patient Experience:** User-friendly interface and improved care coordination

## Security and Compliance

- HIPAA-compliant data handling
- End-to-end encryption for sensitive information
- Regular security audits and updates
- Patient-controlled data sharing

## Contributing

We welcome contributions to improve the platform. Please read our contributing guidelines before submitting pull requests.

## License

[Add License Information]

## Acknowledgments

- Faithbase HackTech mentors for the challenge opportunity
- The Hugging Face team for providing the SymptomsDisease246k dataset
- All contributors and participants in the hackathon

## Contact

- Adela Tanca - adeltaancaa@gmail.com
- Briana Filip - brianafilip.13@mail.com
- Pop Lucian - lucipop1@hotmail.com
- Botis Vlad - vgbotis@gmail.com
