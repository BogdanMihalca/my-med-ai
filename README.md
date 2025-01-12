# MediConnect - AI-Powered Medical Referral Platform

![MediConnect Banner](/public/ss7.png)

MediConnect is an innovative AI-driven healthcare platform that revolutionizes the medical referral process. Built during an AI hackathon, it combines locally trained BERT models with OpenAI capabilities to provide accurate symptom analysis and specialist matching.

## 🌟 Key Features

### For Patients

- **Smart Symptom Analysis**
  - Client-side inference using ONNX-optimized BERT model
  - Parallel analysis with OpenAI agent for comparative results
  - Interactive symptom input through guided journey or free text
  - Downloadable PDF reports with detailed analysis
  - Confidence score visualization with interactive charts
  - Direct Google search integration for condition details

### For Healthcare Providers

- **Professional Dashboard**
  - Appointment management system
  - Patient data organization
  - Schedule optimization tools

### Core Platform Features

- **Modern Authentication**
  - Google integration via NextAuth
  - Secure session management
- **Beautiful UI/UX**
  - Responsive landing page
  - Intuitive pricing panel
  - Dark/light mode support
- **Data Management**
  - Prisma ORM integration
  - Neon Edge database for scalability
  - HIPAA-compliant data handling

## 🚀 Technical Stack

### Frontend

- **Next.js 14+** - React framework for production
- **React 19** - UI library
- **TailwindCSS** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Recharts** - Visualization components

### Backend & Database

- **Prisma** - Type-safe ORM
- **Neon Database** - Serverless Postgres
- **NextAuth** - Authentication
- **OpenAI API** - AI agent integration

### AI/ML Components

- **Custom BERT Model**
  - Trained on SymptomsDisease246k dataset
  - Converted to ONNX for client-side inference
- **Transformers.js** - Client-side ML inference
- **OpenAI Integration** - Comparative analysis

## 📈 Performance & Optimization

- Client-side ML inference for reduced latency
- Optimized bundle size with Next.js
- Edge-ready database with Neon
- Analytics integration via Vercel

## 🛠️ Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/mediconnect.git
cd mediconnect
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

Required environment variables:

- `DATABASE_URL` - Neon database connection string
- `AUTH_SECRET` - Authentication secret
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `OPENAI_API_KEY` - OpenAI API key

4. Initialize Prisma

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server

```bash
npm run dev
# or
yarn dev
```

## 📸 Screenshots

![Landing Page](/public/ss7.png)
_Beautiful landing page with modern design_

![Symptom Analysis](/public/ss2.png)
_AI-powered symptom analysis interface_

![Medical records management](/public/ss5.png)
_Patient medical records management_

![Appointment Scheduling](/public/ss3.png)
_Appointment scheduling system_

![Symptom Analysis Report](/public/ss4.png)
_Detailed symptom analysis report_

![Screening form](/public/ss1.png)
_Interactive symptom input form_

![Pricing Page](/public/ss8.png)
_Intuitive pricing panel_

![Doctor Dashboard](/public/ss9.png)
_Professional healthcare provider dashboard_

## 🔜 Roadmap

- [ ] Complete appointment management system
- [ ] Enhanced medical history tracking
- [ ] Integration with electronic health records
- [ ] Mobile application development
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Telehealth integration

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).

## 👥 Team

- Bogdan Mihalca - Project Lead & AI Development
- Briana Filip - Frontend Development
- Pop Lucian - Backend Architecture
- Botis Vlad - ML Engineering
- Adela Tanca - UI/UX Design

## 📞 Contact

For questions and support, please contact me at [mailto:mihalcabogdan8@gmail.com]

---

Built with ❤️ during the Faithbase HackTech Challenge
