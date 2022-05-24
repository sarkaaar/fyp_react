export default function DoctorCard(person) {
  return (
    <div className="bg-white">
      <div className="mx-auto py-12 px-4 max-w-7xl h-96 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12"></div>
        <li key={person.name}>
          <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
            <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
              <img
                className="object-cover shadow-lg rounded-lg"
                src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTgwMTc5MTIxNDE2OTcxNjA4/gettyimages-1165301142.jpg"
                alt="image"
              />
            </div>
            <div className="sm:col-span-2">
              <div className="space-y-4">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3>Dr. {" "}{person?.obj.name}</h3>
                  <p className="text-indigo-600">{person?.obj.fees}</p>
                </div>
                <div className="text-lg">
                  <p className="text-gray-500">{person?.obj.clinicName}</p>
                  <p className="text-gray-500">"{person?.obj.clinicAddress}"</p>
                  <p className="text-gray-500 italic">
                    {person?.obj.clinicPhone}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <button onClick={()=>{console.log(person.obj.name)}}>click</button> */}
        </li>
      </div>
    </div>
  );
}
