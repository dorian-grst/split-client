import logo from '@/assets/white_logo.svg';
import app from '@/assets/app.png';
import { ChevronDoubleUpIcon, ChevronDoubleRightIcon, ArrowLongRightIcon, PlusCircleIcon, UserCircleIcon, ClockIcon, CalculatorIcon, QueueListIcon, BellAlertIcon } from '@heroicons/react/24/outline';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import Feature from '@/components/presentation/Feature';
import Details from '@/components/presentation/Details';
import Advantages from '@/components/presentation/Advantages';
import Faq from '@/components/presentation/Faq';

const features = [
    {
        title: 'Create Splits in a Snap',
        description: 'Organize your shared expenses by creating friendly Splits in just a few seconds. Perfect for outings with friends, group trips, and much more!',
        icon: <PlusCircleIcon />,
    },
    {
        title: 'Easily Add and Manage Participants',
        description: 'Invite your friends, family, or colleagues to join your Splits. Our user-friendly interface allows you to effortlessly add and manage participants.',
        icon: <UserCircleIcon />,
    },
    {
        title: 'Track Your Expenses in Real Time',
        description: 'Keep an instant record of all expenses made by participants. See who paid for what and monitor account balances in real-time.',
        icon: <ClockIcon />,
    },
    {
        title: 'Automatic Debt Calculation',
        description: 'SPL!T simplifies debt management. Our intelligent algorithm automatically calculates amounts to be repaid, saving you from complex calculations.',
        icon: <CalculatorIcon />,
    },
    {
        title: 'Explore Transaction History',
        description: "Navigate the complete transaction history for each Split. Identify past expenses, completed repayments, and track everyone's contributions over time.",
        icon: <QueueListIcon />,
    },
    {
        title: 'Stay Informed with Customized Notifications',
        description: 'Receive personalized notifications for important updates. Never miss a repayment or new expense; stay consistently informed.',
        icon: <BellAlertIcon />,
    },
];

const navItems = [
    { text: 'Features', link: 'features' },
    { text: 'Details', link: 'details' },
    { text: 'Pricing', link: 'pricing' },
    { text: 'FAQ', link: 'faq' },
];

const advantagesLeft = [
    { text: 'Create splits', released: true },
    { text: 'Join splits', released: true },
    { text: 'Manage your expenses', released: true },
    { text: 'Visualize your expenses', released: true },
    { text: 'Explore your expenses', released: true },
    { text: 'Invite friends', released: false },
];

const advantagesRight = [
    { text: 'Compare your expenses', released: true },
    { text: 'Modify your profile picture', released: false },
    { text: 'Modify your split profile picture', released: false },
    { text: 'Remove a member from your split', released: false },
    { text: 'Delete a transaction', released: false },
    { text: 'Search a split in your dropdown', released: false },
];

const questionList = [
    {
        question: 'What is SPL!T?',
        answer: 'SPL!T is a web application that allows you to easily manage your expenses with your friends.',
    },
    {
        question: 'How does it work?',
        answer: 'SPL!T allows you to create splits and invite your friends to join them. You can then add expenses to your splits and SPL!T will automatically calculate how much each person owes.',
    },
    {
        question: 'How much does it cost?',
        answer: 'SPL!T is completely free and will always be.',
    },
    {
        question: 'Is SPL!T in constant evolution?',
        answer: 'Yes! SPL!T is my first solo web development project, and there will be continuous updates, improvements, and exciting new features in the future.',
    },
    {
        question: 'How can I contact you?',
        answer: 'You can contact us by email at dorian.grasset.contact@gmail.com',
    },
    {
        question: 'Who are the most handsome in the class?',
        answer: 'The most handsome individuals in the class are Nathael Bonnal, Mathias Durat, Tristan Radulescu, and not to forget the esteemed professor Christophe Nauroy.',
    },
];

export default function Home() {
    return (
        <div className="relative z-10 flex h-full w-full items-center justify-center scroll-smooth bg-gray-900">
            <div className="absolute left-0 top-0 -z-10 h-screen w-full bg-abstract bg-cover bg-no-repeat"></div>
            <ScrollLink activeClass="active" smooth spy to="main" className="fixed bottom-8 right-8 cursor-pointer rounded-full bg-white p-2 mix-blend-difference">
                <ChevronDoubleUpIcon className="h-8 w-8 text-black" />
            </ScrollLink>
            <div className="flex w-[80%] flex-col items-center justify-center">
                <section id="main" className="pb-32 pt-20">
                    <div className="flex flex-col items-center justify-center">
                        <nav className="rounded-full border border-white px-6 py-3">
                            <ul className="flex flex-row gap-6">
                                {navItems.map((item, index) => (
                                    <li key={index}>
                                        <ScrollLink activeClass="active" smooth spy to={item.link}>
                                            <h3 className="cursor-pointer text-white">{item.text}</h3>
                                        </ScrollLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="flex flex-row gap-5 pb-8 pt-48">
                            <img src={logo} alt="logo" className="h-[60px] w-[60px]" />
                            <h1 className="text-6xl text-white">SPL!T</h1>
                        </div>
                        <h3 className="pb-16 text-white">The ultimate tool for sharing your activity expenses</h3>
                        <RouterLink className="flex flex-row items-center justify-center gap-2 rounded-lg border border-white px-6 py-4 text-white" to={'/signup'}>
                            <h3>Register now</h3> <ChevronDoubleRightIcon className="h-4 w-4" />
                        </RouterLink>
                        <img src={app} alt="app" className="pt-8" />
                    </div>
                </section>

                <section id="features" className="py-32">
                    <div className="flex flex-col items-center justify-center gap-24 ">
                        <div className="flex flex-row gap-4">
                            <h1 className="text-6xl text-white">SPL!T's main</h1>
                            <h1 className="text-purple-linear text-6xl">features</h1>
                        </div>
                        <div className="flex flex-row flex-wrap justify-center gap-12">
                            {features.map((feature, index) => (
                                <Feature key={index} title={feature.title} description={feature.description} icon={feature.icon} />
                            ))}
                        </div>
                    </div>
                </section>

                <section id="details" className="py-32">
                    <div className="flex flex-row items-center justify-center gap-12 px-12">
                        <div className="flex flex-col items-center justify-center gap-12">
                            <h2 className="text-4xl font-semibold text-white">Manage expenses with friends effortlessly using SPL!T: create, invite, and share!</h2>
                            <Details
                                number={'2.'}
                                title={'Cutting-edge Technologies'}
                                description={
                                    'At SPL!T, we leverage cutting-edge technologies to provide users with a seamless and innovative expense-sharing experience. Our tech stack incorporates the latest advancements, ensuring optimal performance, scalability, and security. By staying at the forefront of technological progress, we empower users with a feature-rich platform that evolves alongside emerging trends in the digital landscape.'
                                }
                            />
                            <Details
                                number={'4.'}
                                title={'User-Centric Design Philosophy'}
                                description={
                                    "Our design philosophy at SPL!T revolves around putting users first. Every feature, from split creation to debt calculation, is designed with simplicity and user-friendliness in mind. We prioritize an intuitive interface that minimizes the learning curve, ensuring that users can effortlessly navigate and make the most of SPL!T's powerful capabilities. User feedback is at the core of our iterative design process, guaranteeing an experience that aligns with the diverse needs of our community."
                                }
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-12">
                            <Details
                                number={'1.'}
                                title={'Open Source Foundation'}
                                description={
                                    'SPL!T is built on an open-source foundation, fostering a collaborative environment for continuous improvement. Our commitment to transparency allows developers worldwide to contribute, ensuring a robust and secure platform. Embracing the spirit of open source enables us to evolve rapidly, driven by a community dedicated to enhancing the user experience and expanding functionality.'
                                }
                            />
                            <Details
                                number={'3.'}
                                title={'Multiplatform Accessibility'}
                                description={
                                    "SPL!T goes beyond device boundaries, offering a multiplatform experience that adapts to users' preferences. Whether you're on your desktop, tablet, or mobile device, SPL!T ensures a consistent and user-friendly interface. Embracing multiplatform accessibility enhances the flexibility and convenience of managing your shared expenses, no matter where life takes you."
                                }
                            />
                        </div>
                    </div>
                </section>

                <section id="pricing" className="py-32">
                    <div className="flex flex-col items-center justify-center gap-24">
                        <div className="flex flex-row flex-wrap justify-center gap-4 whitespace-nowrap">
                            <h1 className=" text-6xl text-white">One application,</h1>
                            <h1 className="text-purple-linear text-6xl">many</h1>
                            <h1 className="text-6xl text-white">advantages</h1>
                        </div>
                        <div className="flex flex-col gap-16 rounded-2xl bg-gray-800 p-8">
                            <h2 className="font-bold text-white">SPL!T</h2>
                            <div className="flex flex-row gap-32">
                                <div className="flex flex-col items-start justify-center gap-6">
                                    {advantagesLeft.map((advantage, index) => (
                                        <Advantages key={index} text={advantage.text} released={advantage.released} />
                                    ))}
                                </div>
                                <div className="flex flex-col items-start justify-center gap-6">
                                    {advantagesRight.map((advantage, index) => (
                                        <Advantages key={index} text={advantage.text} released={advantage.released} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <h2 className="font-semibold text-white">Free</h2>
                                <RouterLink to="/signup" className="flex flex-row items-center justify-center gap-3 rounded-lg bg-purple-primary px-6 py-3">
                                    <h3 className="text-white">Try it now !</h3>
                                    <ArrowLongRightIcon className="h-4 w-4 text-white" />
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="faq" className="pt-32">
                    <div className="flex flex-col items-center justify-center gap-24">
                        <div className="flex flex-row flex-wrap justify-center gap-4 whitespace-nowrap">
                            <h1 className=" text-6xl text-white">We've got</h1>
                            <h1 className="text-purple-linear text-6xl">answers</h1>
                            <h1 className="text-6xl text-white">to your questions</h1>
                        </div>
                        <Faq questionList={questionList} />
                    </div>
                </section>
                <footer className="flex w-full flex-row justify-between">
                    <section className="flex flex-col px-48 py-24">
                        <p className="font-bold text-white">
                            Made with ♡ by{' '}
                            <a href="https://www.instagram.com/rapidement/" className="text-warn font-bold hover:underline">
                                @rapidement
                            </a>
                        </p>
                        <RouterLink to="/login" className=" text-white hover:underline">
                            Terms of services
                        </RouterLink>
                        <RouterLink to="/login" className="text-white hover:underline">
                            Privacy policy
                        </RouterLink>
                    </section>
                    <section className="flex flex-col px-48 py-24 text-right">
                        <p className="font-bold text-white">Alternatives</p>
                        <a href="" className="text-white hover:underline">
                            tricount.com
                        </a>
                        <a href="" className="text-white hover:underline">
                            ratathune.fr
                        </a>
                        <a href="" className="text-white hover:underline">
                            polybank.fr
                        </a>
                    </section>
                </footer>
            </div>
        </div>
    );
}
