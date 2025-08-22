import React from "react";
import { FaUsers, FaBullseye, FaHandshake, FaRoad } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Pothole Reporter
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're on a mission to make roads safer for everyone through
            community-driven reporting
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4 text-lg">
              Pothole Reporter was born from a simple idea: what if we could
              harness the power of community to identify and fix road hazards
              before they cause damage or accidents?
            </p>
            <p className="text-gray-600 mb-4 text-lg">
              We believe that safer roads start with awareness. Our platform
              empowers citizens to take an active role in maintaining their
              local infrastructure by reporting potholes quickly and easily.
            </p>
            <p className="text-gray-600 text-lg">
              By working together, we can create a comprehensive network of road
              condition data that helps municipalities prioritize repairs and
              keep our communities safe.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="bg-blue-100 p-8 rounded-xl shadow-md">
              <FaRoad className="text-6xl text-blue-600 mb-6 mx-auto" />
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
                Making a Difference Together
              </h3>
              <p className="text-gray-600 text-center">
                Every report contributes to safer roads, prevents vehicle
                damage, and helps local governments allocate resources
                efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Community First
              </h3>
              <p className="text-gray-600">
                We believe in the power of community. Our platform connects
                citizens, local authorities, and organizations to create safer
                roads for everyone.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBullseye className="text-2xl text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Transparency
              </h3>
              <p className="text-gray-600">
                We're committed to transparency in our processes. Every report
                is tracked, and users can see the status of issues they've
                reported.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Collaboration
              </h3>
              <p className="text-gray-600">
                We work with local governments and road maintenance teams to
                ensure reported issues are addressed promptly and efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          How It Works
        </h2>

        <div className="flex flex-col space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/4 flex justify-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                1
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Report a Pothole
              </h3>
              <p className="text-gray-600">
                When you spot a pothole, simply open our app or website, provide
                the location, add a photo if possible, and submit details about
                its size and severity.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/4 flex justify-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                2
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Verification & Prioritization
              </h3>
              <p className="text-gray-600">
                Our system verifies the report and our algorithm prioritizes it
                based on severity, location, and potential impact on road
                safety.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/4 flex justify-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                3
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Notification to Authorities
              </h3>
              <p className="text-gray-600">
                Verified reports are forwarded to the appropriate local
                authorities or maintenance teams with all the necessary details
                for efficient resolution.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/4 flex justify-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                4
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Track Progress
              </h3>
              <p className="text-gray-600">
                You can track the status of your report through our platform,
                from submission to resolution, creating accountability and
                transparency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Potholes Reported</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-200">Cities Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-blue-200">Resolution Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-200">Community Members</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Help make roads safer in your community by reporting potholes and
            road hazards
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Report a Pothole
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Learn How to Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
