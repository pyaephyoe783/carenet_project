import { Target, Zap, Handshake, Users  , Phone, Mail } from 'lucide-react';

const CommitmentSection = () => (
    <section className="mb-16 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
            Our Commitment to You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="p-4">
                <Target size={40} className="text-pink-500 mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">100% Transparency</h3>
                <p className="text-gray-600">
                    Every donation and expense is tracked and publicly reported for full visibility.
                </p>
            </div>

            <div className="p-4">
                <Zap size={40} className="text-yellow-500 mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">High Impact Focus</h3>
                <p className="text-gray-600">
                    We select and partner only with the most effective and reputable organizations.
                </p>
            </div>

            <div className="p-4">
                <Handshake size={40} className="text-teal-500 mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Donor Security</h3>
                <p className="text-gray-600">
                    Your personal information and donations are protected with industry-leading security measures.
                </p>
            </div>
            
        </div>
    </section>
);

export default CommitmentSection;
