import Header from "./doctor_components/Header";
export default function Slots() {
  return (
    <>
      <Header />
      <h1>Slots Page</h1>

      <div className="flex justify-center relative overflow-x-auto shadow-lg sm:rounded-lg">
      <table class="text-sm text-center text-black-500 w-96">
          <thead class="text-xs text-gray-700 uppercase bg-indigo-400 ">
            <tr>
              <th scope="col" class="p-4">
                
              </th>
              <th scope="col" class="px-6 py-3">
                Days
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b hover:bg-rose-200">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-white-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label for="checkbox-table-1" class="sr-only">checkbox</label>
                </div>
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Monday
              </th>
            </tr>
            <tr class="bg-white border-b hover:bg-rose-200 ">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input id="checkbox-table-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-2" class="sr-only">checkbox</label>
                </div>
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Tuesday
              </th>
            </tr>
            <tr class="bg-white hover:bg-rose-200">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-3" class="sr-only">checkbox</label>
                </div>
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Wednesday
              </th>
            </tr>
            <tr class="bg-white hover:bg-rose-200">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-3" class="sr-only">checkbox</label>
                </div>
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Thursday
              </th>
            </tr>
            <tr class="bg-white hover:bg-rose-200">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-3" class="sr-only">checkbox</label>
                </div>
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Friday
              </th>
            </tr>
            <tr class="bg-white hover:bg-rose-200">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-3" class="sr-only">checkbox</label>
                </div>
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Saturday
              </th>
            </tr>
            <tr class="bg-white hover:bg-rose-200">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-3" class="sr-only">checkbox</label>
                </div>
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Sunday
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
