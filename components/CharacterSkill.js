import { skillFunction } from '../lib/skillFunction';

export default function CharacterSkill({ id, skill }) {
    return (
        <div>
            <div className="py-4 rounded-xl bg-item flex flex-col mb-4">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto">
                        <div className="py-2 align-middle inline-block min-w-full">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr className="bg-red-200">
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Level</span>
                                            </th>
                                            {skill.attributes[0].values.map((val, index) => (
                                                <th
                                                    key={index}
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs text-gray-500 font-bold uppercase tracking-wider"
                                                >
                                                    {index + 1}
                                                    {/* Level */}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {skill.attributes.map((attribute, index) => (
                                            <tr
                                                key={index}
                                                className={`${index % 2 != 0 ? 'bg-green-100' : 'bg-blue-100'}`}
                                            >
                                                <td
                                                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold ${
                                                        index % 2 != 0 ? 'bg-green-200' : 'bg-blue-200'
                                                    }`}
                                                >
                                                    {attribute.label}
                                                </td>
                                                {attribute.values.map((value, index) => (
                                                    <td
                                                        key={index}
                                                        className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"
                                                    >
                                                        {value}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
