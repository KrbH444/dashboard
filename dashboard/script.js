// 1- Function to put the current date --------------------------------------------------------------------
function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const currentDateElement = document.getElementById('currentDate');
currentDateElement.textContent = getCurrentDate();



// 2- Search Function --------------------------------------------------------------------
const searchInput = document.getElementById('search-input');
const chartContainers = document.querySelectorAll('.chart-container');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();

  chartContainers.forEach(container => {
    const containerText = container.textContent.toLowerCase();
    if (searchTerm === '') {
      container.style.transition = '';
      container.style.opacity = '';
      container.style.transform = '';
      container.style.display = '';
    } else if (containerText.includes(searchTerm)) {
      if (container.style.display === 'none') {
        container.style.opacity = '0';
        container.style.transform = 'translateX(100%)';
        container.style.display = 'block';
        setTimeout(() => {
          container.style.transition = 'opacity 0.5s, transform 0.5s';
          container.style.opacity = '1';
          container.style.transform = 'translateX(0)';
        }, 0);
      }
    } else {
      if (container.style.display !== 'none') {
        container.style.transition = 'opacity 0.5s, transform 0.5s';
        container.style.opacity = '0';
        container.style.transform = 'translateX(100%)';
        setTimeout(() => {
          container.style.display = 'none';
        }, 500);
      }
    }
  });
});



// 3- Function to convert the canvas to PDF --------------------------------------------------------------------
const pdf_btn = document.querySelector('#toPDF');
const employee_table = document.querySelector('.table');

const toPDF = async function () {
  const charts = document.querySelectorAll('.chart-container-wrapper');

  const chartImages = [];

  for (const chartContainer of charts) {
    const canvas = await html2canvas(chartContainer);
    const image = canvas.toDataURL('image/png');
    chartImages.push(image);
  }

  const new_window = window.open();
  const html_code = `
          <link rel="stylesheet" href="style.css">
          <main class="table">${employee_table.innerHTML}</main>
      `;

  const pdfContent = `
          <html>
          <head>
              <style>
                  ${window.getComputedStyle(document.querySelector('link[rel="stylesheet"]')).textContent}
              </style>
          </head>
          <body>
              ${html_code}
              ${chartImages.map(image => `<img src="${image}" />`).join('')}
          </body>
          </html>
      `;

  new_window.document.write(pdfContent);

  setTimeout(() => {
    new_window.document.close();
    new_window.print();
    new_window.close();
  }, 400);
};

pdf_btn.onclick = () => {
  toPDF();
};



//4- function for a dynamic side dashboard --------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const dashboard = document.querySelector('.dashboard');
  const mainContent = document.querySelector('.main-content');
  const logo = document.querySelector('.header1 img');
  const title = document.querySelector('.header1 h2');
  const searchbar = document.querySelector('.header1 .input-group');
  logo.addEventListener('click', function () {
    dashboard.classList.toggle('active');
    mainContent.classList.toggle('active');
    title.classList.toggle('active');
    logo.classList.toggle('active');
    searchbar.classList.toggle('active');
  });
});



//Employees Data --------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {


  const tableData = [
    {
      "Employee Name": "Adinolfi Wilson K",
      "EmpID": "1988299991",
      "Department": "Software Engineering",
      "Position": "Software Engineer I",
      "Date of Hire": "7/5/2011",
      "Date of Termination": "",
      "Performance Score": "4",
      "EmpSatisfaction": "4",
      "Attendance Rate": "86.87392894",
      "ManagerName": "Peter Monroe",
      "ManagerID": "7",
      "Salary": [5004, 3824, 3318, 4144, 5686, 5695, 5633, 5023, 3360, 6647, 5675, 4952, 5854, 4582, 3904, 6068, 4353, 4602, 6073, 3410, 6818, 6497, 4397, 3350, 5496, 5569, 4935, 3073, 5673, 3983, 4230, 3270, 4554, 6199, 3828, 3657],
      "Attendance data": ["On-Time", "Late", "Absent", "On-Time", "On-Time", "Absent", "On-Time", "On-Time", "Late", "On-Time", "Late", "On-Time"]
    },
    {
      "Employee Name": "Ait Sidi Karthikeyan",
      "EmpID": "1105025718",
      "Department": "IT/IS",
      "Position": "Sr. DBA",
      "Date of Hire": "3/30/2015",
      "Date of Termination": "6/16/2016",
      "Performance Score": "5",
      "EmpSatisfaction": "5",
      "Attendance Rate": "98.95362259",
      "ManagerName": "Simon Roup",
      "ManagerID": "4",
      "Salary": [6493, 5011, 3211, 3019, 3315, 3319, 5469, 5700, 4167, 4034, 5344, 4067, 5866, 6306, 3370, 4892, 5465, 4085, 4750, 4561, 3731, 5196, 7000, 4510, 3989, 4585, 4591, 5189, 4320, 5155, 4251, 3886, 3100, 6685, 3329, 5971],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "Late", "On-Time"]
    },
    {
      "Employee Name": "Akinkuolie Sarah",
      "EmpID": "1109029256",
      "Department": "Software Engineering",
      "Position": "Software Engineer II",
      "Date of Hire": "7/5/2011",
      "Date of Termination": "9/24/2012",
      "Performance Score": "3",
      "EmpSatisfaction": "4",
      "Attendance Rate": "71.5146271",
      "ManagerName": "Michael Albert",
      "ManagerID": "22",
      "Salary": [6926, 3098, 3904, 6762, 6738, 3591, 3652, 4829, 4616, 6647, 5649, 5763, 5468, 6140, 6899, 4053, 3330, 3924, 5759, 5753, 5776, 4596, 3330, 5031, 6667, 6377, 5569, 4155, 4560, 4605, 5128, 3410, 3038, 5845, 6779, 3603],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "On-Time", "Absent", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Alagbe Trina",
      "EmpID": "1012023013",
      "Department": "Software Engineering",
      "Position": "Software Engineer I",
      "Date of Hire": "1/7/2008",
      "Date of Termination": "",
      "Performance Score": "2",
      "EmpSatisfaction": "3",
      "Attendance Rate": "73.89991423",
      "ManagerName": "Peter Monroe",
      "ManagerID": "7",
      "Salary": [6936, 6762, 5118, 4699, 6217, 4878, 5422, 4725, 3956, 3828, 3216, 5782, 3793, 5095, 3218, 4689, 6714, 5251, 5325, 6706, 3420, 4339, 6853, 6179, 3495, 6362, 3587, 4624, 5972, 3501, 6153, 3772, 4501, 4395, 4208, 3328],
      "Attendance data": ["On-Time", "Late", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Albert Michael",
      "EmpID": "1006020066",
      "Department": "Production",
      "Position": "Production Manager",
      "Date of Hire": "8/1/2011",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "5",
      "Attendance Rate": "76.21943719",
      "ManagerName": "Janet King",
      "ManagerID": "2",
      "Salary": [4316, 4907, 5564, 3769, 6100, 4839, 5263, 6905, 3553, 3107, 4068, 6683, 4471, 3515, 6079, 6206, 6570, 4732, 5090, 5605, 4274, 3762, 4464, 6266, 3451, 5558, 6036, 4979, 5351, 6271, 6100, 5353, 3997, 5454, 3359, 6968],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "Late", "On-Time"]
    },
    {
      "Employee Name": "Anderson Carol",
      "EmpID": "1001956578",
      "Department": "Software Engineering",
      "Position": "Software Engineer I",
      "Date of Hire": "7/11/2011",
      "Date of Termination": "9/6/2011",
      "Performance Score": "2",
      "EmpSatisfaction": "3",
      "Attendance Rate": "71.47757841",
      "ManagerName": "Peter Monroe",
      "ManagerID": "7",
      "Salary": [6895, 6864, 3862, 4443, 3304, 6181, 5960, 6817, 4204, 3235, 5282, 4304, 4387, 3885, 6137, 6120, 3734, 6202, 4471, 4858, 3388, 6591, 3997, 5872, 5061, 3642, 6094, 3293, 6371, 5187, 5832, 3543, 6805, 5891, 6874, 3710],
      "Attendance data": ["On-Time", "Late", "Absent", "On-Time", "On-Time", "Absent", "On-Time", "On-Time", "Late", "On-Time", "Late", "On-Time"]
    },
    {
      "Employee Name": "Anderson Linda",
      "EmpID": "906014183",
      "Department": "Software Engineering",
      "Position": "Software EngineerI",
      "Date of Hire": "1/9/2012",
      "Date of Termination": "",
      "Performance Score": "Exceptional",
      "EmpSatisfaction": "3",
      "Attendance Rate": "83.65378985",
      "ManagerName": "Peter Monroe",
      "ManagerID": "7",
      "Salary": [5491, 3864, 3152, 3393, 6599, 6938, 6152, 3993, 6950, 5117, 3860, 6514, 6778, 4205, 5736, 5257, 5590, 6062, 4628, 3563, 3556, 3782, 3675, 3066, 5807, 6783, 5392, 3059, 5201, 5967, 5643, 6349, 3675, 4391, 5443, 3028],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "Late", "On-Time"]
    },
    {
      "Employee Name": "Andreola Colby",
      "EmpID": "1203032498",
      "Department": "Software Engineering",
      "Position": "Software Engineer",
      "Date of Hire": "11/10/2014",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "5",
      "Attendance Rate": "99.42554663",
      "ManagerName": "Alex Sweetwater",
      "ManagerID": "10",
      "Salary": [3605, 3720, 3757, 5251, 6516, 6703, 6498, 6859, 4627, 6874, 5158, 3720, 5262, 6240, 5678, 6974, 5034, 5054, 4875, 4813, 3335, 4241, 6995, 6762, 5604, 5772, 6078, 3322, 3093, 4846, 5897, 6994, 4504, 5503, 4279, 3699],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "On-Time", "Absent", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Athwal Sam",
      "EmpID": "1104025466",
      "Department": "Production",
      "Position": "Production Technician I",
      "Date of Hire": "9/30/2013",
      "Date of Termination": "",
      "Performance Score": "1",
      "EmpSatisfaction": "3",
      "Attendance Rate": "76.6560916",
      "ManagerName": "Peter Monroe",
      "ManagerID": "7",
      "Salary": [6938, 6829, 3847, 5850, 4985, 6313, 4407, 5035, 6320, 5188, 4892, 3772, 5029, 5007, 3793, 5237, 3721, 6637, 4960, 5811, 3701, 4570, 4153, 4177, 5943, 5692, 4881, 6097, 4889, 4186, 6868, 3217, 6933, 6107, 5897, 5304],
      "Attendance data": ["On-Time", "Late", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Bachiochi Linda",
      "EmpID": "1411071506",
      "Department": "Production",
      "Position": "Production Technician I",
      "Date of Hire": "7/6/2009",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "4",
      "Attendance Rate": "82.06451791",
      "ManagerName": "Peter Monroe",
      "ManagerID": "7",
      "Salary": [4160, 3626, 6993, 6615, 3323, 6336, 3689, 5642, 3300, 6551, 5450, 5792, 5934, 6698, 3194, 5359, 6582, 3253, 3069, 3582, 5131, 5480, 6705, 4829, 4824, 3991, 3891, 5144, 5649, 4480, 4743, 5419, 6402, 3209, 6657, 3120],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "Late", "On-Time"]
    },
    {
      "Employee Name": "Bacong Alejandro",
      "EmpID": "1009919980",
      "Department": "IT/IS",
      "Position": "Network Engineer",
      "Date of Hire": "1/5/2015",
      "Date of Termination": "",
      "Performance Score": "3",
      "EmpSatisfaction": "5",
      "Attendance Rate": "83.75600171",
      "ManagerName": "Brian Champaigne",
      "ManagerID": "13",
      "Salary": [3804, 6350, 4630, 5599, 6648, 5128, 6557, 4800, 3427, 5581, 3640, 6893, 5869, 4736, 4163, 5562, 4112, 4591, 6814, 6517, 4641, 6401, 3959, 6042, 5001, 4818, 3024, 6963, 3732, 5434, 3033, 6846, 4265, 3896, 6971, 4483],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "On-Time", "Absent", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Baczenski Rachael",
      "EmpID": "1001495124",
      "Department": "Production",
      "Position": "Production Technician I",
      "Date of Hire": "1/10/2011",
      "Date of Termination": "1/12/2011",
      "Performance Score": "1",
      "EmpSatisfaction": "3",
      "Attendance Rate": "70.38779299",
      "ManagerName": "Board of Directors",
      "ManagerID": "9",
      "Salary": [5075, 4980, 6537, 6427, 6255, 4715, 3600, 4345, 4455, 3037, 6159, 5527, 4672, 3190, 3931, 3740, 6518, 3278, 6261, 4568, 5940, 6490, 5593, 3961, 4005, 5957, 4237, 4696, 5849, 3833, 6186, 3780, 3748, 6304, 3906, 4091],
      "Attendance data": ["On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Barbara Thomas",
      "EmpID": "1501072311",
      "Department": "Production",
      "Position": "Production Technician I",
      "Date of Hire": "4/2/2012",
      "Date of Termination": "9/19/2012",
      "Performance Score": "3",
      "EmpSatisfaction": "3",
      "Attendance Rate": "89.62189032",
      "ManagerName": "Janet King",
      "ManagerID": "2",
      "Salary": [4819, 3088, 5454, 4843, 4042, 6665, 5559, 6026, 5948, 4636, 5873, 6377, 4986, 4902, 4121, 5311, 3108, 5195, 5565, 5454, 6699, 5354, 6229, 5237, 3078, 5611, 5242, 6999, 6204, 4750, 3057, 4538, 6398, 3013, 6472, 4850],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Barone Francesco A",
      "EmpID": "1303054580",
      "Department": "Production",
      "Position": "Production Technician I",
      "Date of Hire": "2/20/2012",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "3",
      "Attendance Rate": "93.65585857",
      "ManagerName": "Janet King",
      "ManagerID": "2",
      "Salary": [5859, 4487, 5870, 3487, 3278, 4847, 5553, 5184, 3804, 4262, 6987, 6579, 5034, 4443, 3896, 3904, 6962, 6848, 6617, 3949, 6039, 6335, 6539, 5093, 3790, 4863, 5255, 4858, 6497, 5265, 3714, 4434, 4858, 3271, 5812, 5834],
      "Attendance data": ["On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Barton Nader",
      "EmpID": "1110029990",
      "Department": "Production",
      "Position": "Production Technician I",
      "Date of Hire": "9/24/2012",
      "Date of Termination": "4/6/2013",
      "Performance Score": "5",
      "EmpSatisfaction": "3",
      "Attendance Rate": "95.53543197",
      "ManagerName": "Janet King",
      "ManagerID": "2",
      "Salary": [4647, 4602, 6354, 4860, 6805, 6900, 4707, 5199, 5795, 4264, 4078, 3644, 4842, 5664, 5192, 6160, 6472, 5843, 5910, 6781, 5073, 6972, 6067, 6820, 6334, 3449, 3800, 5383, 5875, 3503, 5804, 3340, 4509, 5825, 6869, 3183],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Beak Kimberly",
      "EmpID": "1103024335",
      "Department": "Production",
      "Position": "Production Technician II",
      "Date of Hire": "7/21/2016",
      "Date of Termination": "",
      "Performance Score": "4",
      "EmpSatisfaction": "3",
      "Attendance Rate": "71.07743615",
      "ManagerName": "Michael Albert",
      "ManagerID": "22",
      "Salary": [4456, 4147, 4508, 5428, 3682, 3825, 6957, 6369, 3303, 6316, 3870, 6011, 4799, 5999, 5213, 3364, 5999, 5693, 4031, 5251, 6865, 4908, 3360, 5479, 3826, 4847, 4487, 4228, 4616, 4394, 5015, 5680, 4772, 4404, 3394, 4751],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Beatrice Courtney",
      "EmpID": "1409070147",
      "Department": "Production",
      "Position": "Production Technician I",
      "Date of Hire": "4/4/2011",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "4",
      "Attendance Rate": "90.62125829",
      "ManagerName": "Janet King",
      "ManagerID": "2",
      "Salary": [4729, 3015, 4881, 5866, 6306, 5383, 5079, 5787, 4033, 6210, 3025, 3156, 6840, 3897, 5217, 5970, 5645, 5764, 3867, 3570, 5779, 4044, 3422, 3671, 3739, 6309, 4164, 6310, 3539, 3671, 4484, 4981, 3581, 4141, 5959, 6564],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Becker Renee",
      "EmpID": "1411071481",
      "Department": "IT/IS",
      "Position": "Database Administrator",
      "Date of Hire": "7/7/2014",
      "Date of Termination": "9/12/2015",
      "Performance Score": "5",
      "EmpSatisfaction": "3",
      "Attendance Rate": "90.29946835",
      "ManagerName": "John Smith",
      "ManagerID": "17",
      "Salary": [4442, 4383, 6457, 5486, 4540, 6070, 6967, 5294, 3172, 5895, 3939, 4739, 4090, 5065, 5499, 6168, 5978, 5648, 5001, 3182, 3174, 6030, 6533, 6758, 6220, 6987, 4635, 4880, 5005, 4575, 3687, 4202, 6369, 4397, 5868, 4781],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "On-Time", "Absent", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Becker Scott",
      "EmpID": "1307060077",
      "Department": "Production",
      "Position": "Production Technician I",
      "Date of Hire": "7/8/2013",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "3",
      "Attendance Rate": "73.96470614",
      "ManagerName": "Janet King",
      "ManagerID": "2",
      "Salary": [3961, 5028, 6643, 5696, 6468, 6644, 4912, 5662, 6041, 5757, 5109, 4803, 4568, 3561, 6610, 6098, 5701, 5804, 5030, 4615, 5551, 3057, 5740, 3375, 3586, 4173, 6068, 3119, 4300, 3469, 4359, 5834, 3869, 3022, 6227, 3560],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Bernstein Sean",
      "EmpID": "1001944783",
      "Department": "Production",
      "Position": "Production Technician I",
      "Date of Hire": "4/2/2012",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "4",
      "Attendance Rate": "96.79469379",
      "ManagerName": "Janet King",
      "ManagerID": "2",
      "Salary": [3935, 5307, 5405, 3258, 6011, 3856, 6213, 5056, 3672, 6748, 3035, 3660, 5509, 4102, 5881, 6150, 6370, 4556, 5477, 3264, 3527, 5655, 3632, 6934, 4034, 6375, 3536, 3880, 6123, 6913, 4541, 5816, 6649, 5012, 5791, 3011],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Biden Lowan M",
      "EmpID": "1403065874",
      "Department": "Production",
      "Position": "Production Technician I",
      "Date of Hire": "8/19/2013",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "2",
      "Attendance Rate": "79.87471644",
      "ManagerName": "John Smith",
      "ManagerID": "2",
      "Salary": [6433, 5523, 5165, 3717, 4315, 5446, 3812, 3140, 4534, 6672, 4540, 4943, 4078, 5245, 3284, 3625, 6705, 5342, 3796, 6369, 3660, 3878, 4980, 5871, 6378, 6809, 4040, 6315, 3102, 3417, 3327, 3717, 3561, 3529, 5006, 5158],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Billis Helen",
      "EmpID": "1103024679",
      "Department": "Production",
      "Position": "Production Technician I",
      "Date of Hire": "7/7/2014",
      "Date of Termination": "",
      "Performance Score": "4",
      "EmpSatisfaction": "3",
      "Attendance Rate": "87.5436206",
      "ManagerName": "John Smith",
      "ManagerID": "2",
      "Salary": [3761, 3597, 3002, 6021, 5225, 5049, 3679, 4083, 5068, 5143, 3276, 6938, 4665, 6319, 4360, 3273, 3680, 6132, 3327, 4745, 4457, 3020, 6404, 4204, 6177, 5070, 4729, 4538, 5227, 3325, 4287, 3049, 5893, 6554, 6151, 4635],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Blount Dianna",
      "EmpID": "1208048229",
      "Department": "Production",
      "Position": "Production Technician II",
      "Date of Hire": "4/4/2011",
      "Date of Termination": "",
      "Performance Score": "1",
      "EmpSatisfaction": "5",
      "Attendance Rate": "81.93057225",
      "ManagerName": "Michael Albert",
      "ManagerID": "22",
      "Salary": [5747, 3534, 4451, 4335, 4343, 6492, 3246, 6236, 6764, 4192, 5133, 5866, 5601, 3408, 3819, 6217, 3471, 5755, 3533, 5265, 6001, 5121, 6807, 5352, 3765, 3051, 3047, 4307, 6695, 5868, 6827, 4182, 4186, 4248, 5758, 6053],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Bondwell Betsy",
      "EmpID": "1308060535",
      "Department": "Production",
      "Position": "Production Technician II",
      "Date of Hire": "1/10/2011",
      "Date of Termination": "4/4/2014",
      "Performance Score": "3",
      "EmpSatisfaction": "5",
      "Attendance Rate": "81.76664699",
      "ManagerName": "Michael Albert",
      "ManagerID": "22",
      "Salary": [5696, 5718, 4390, 4676, 4607, 4217, 4331, 5940, 3010, 6253, 3705, 4044, 4653, 4574, 4631, 5746, 4000, 3775, 6448, 6219, 5416, 6728, 6380, 5752, 5570, 5753, 4570, 6938, 6946, 4320, 3016, 3444, 3229, 5659, 6378, 6767],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Boutwell Bonalyn",
      "EmpID": "1408069481",
      "Department": "Admin Offices",
      "Position": "Sr. Accountant",
      "Date of Hire": "2/16/2015",
      "Date of Termination": "",
      "Performance Score": "3",
      "EmpSatisfaction": "1",
      "Attendance Rate": "98.07313341",
      "ManagerName": "John Smith",
      "ManagerID": "17",
      "Salary": [3844, 5258, 6567, 3512, 4121, 3662, 4645, 4543, 5482, 6575, 6319, 5021, 6341, 5763, 5795, 4596, 3411, 5351, 6500, 4164, 4026, 3291, 6602, 4296, 4442, 6533, 4323, 6104, 4073, 3387, 6386, 6435, 6416, 5273, 3879, 5844],
      "Attendance data": ["On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Bozzi Charles",
      "EmpID": "1009021646",
      "Department": "Production",
      "Position": "Production Manager",
      "Date of Hire": "9/30/2013",
      "Date of Termination": "8/7/2014",
      "Performance Score": "5",
      "EmpSatisfaction": "4",
      "Attendance Rate": "80.67360091",
      "ManagerName": "John Smith",
      "ManagerID": "2",
      "Salary": [5916, 3587, 6620, 3124, 4807, 3710, 5575, 6614, 4294, 3736, 4589, 6971, 5735, 3173, 5378, 4689, 5113, 3502, 6691, 6222, 3882, 5241, 5165, 3647, 5478, 4382, 6608, 3151, 5614, 6887, 6140, 4373, 5981, 4380, 6489, 3298],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Bramante Elisa",
      "EmpID": "1110029732",
      "Department": "Production",
      "Position": "Director of Operations",
      "Date of Hire": "1/5/2009",
      "Date of Termination": "",
      "Performance Score": "4",
      "EmpSatisfaction": "3",
      "Attendance Rate": "73.30646845",
      "ManagerName": "Simon Roup",
      "ManagerID": "4",
      "Salary": [3120, 6229, 5898, 4983, 3666, 6046, 4123, 3418, 6239, 3131, 5729, 3186, 6591, 6867, 3721, 5980, 6219, 3646, 6238, 5215, 3940, 3503, 5596, 4855, 6027, 4453, 4325, 4828, 6448, 5875, 4199, 4501, 4134, 6763, 3981, 4543],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Brill Donna",
      "EmpID": "1107027351",
      "Department": "Production",
      "Position": "Production Technician I",
      "Date of Hire": "4/2/2012",
      "Date of Termination": "6/15/2013",
      "Performance Score": "5",
      "EmpSatisfaction": "3",
      "Attendance Rate": "84.22591325",
      "ManagerName": "Simon Roup",
      "ManagerID": "2",
      "Salary": [4834, 6960, 3461, 4763, 4344, 3205, 3049, 3124, 4847, 5428, 6975, 6632, 5019, 4317, 3361, 5868, 3986, 4210, 6068, 3345, 6126, 6799, 5281, 6518, 4449, 4941, 4054, 5219, 4523, 4176, 4268, 4051, 4829, 4959, 3286, 5021],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Brown Mia",
      "EmpID": "1103024456",
      "Department": "Admin Offices",
      "Position": "Accountant I",
      "Date of Hire": "10/27/2008",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "2",
      "Attendance Rate": "75.03836764",
      "ManagerName": "Brandon R. LeBlanc",
      "ManagerID": "1",
      "Salary": [4814, 5942, 6053, 5756, 3725, 3843, 5193, 5800, 5132, 3400, 5215, 6325, 5540, 6898, 3057, 5336, 3810, 4319, 6747, 5538, 3475, 5515, 3630, 6474, 6600, 3485, 6175, 3511, 4547, 3706, 4597, 3145, 5361, 6600, 4660, 3232],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Buccheri Joseph",
      "EmpID": "1201031310",
      "Department": "Production",
      "Position": "Production Technician II",
      "Date of Hire": "9/29/2014",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "5",
      "Attendance Rate": "70.80893227",
      "ManagerName": "Michael Albert",
      "ManagerID": "22",
      "Salary": [4372, 5439, 6386, 5838, 3563, 5180, 4635, 3984, 3704, 3741, 3931, 5840, 4329, 5123, 4541, 5551, 3897, 5180, 6726, 3436, 3306, 3497, 4983, 3383, 5350, 4492, 5303, 6541, 3318, 3326, 6625, 5912, 4350, 6793, 6058, 6914],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Buck Edward",
      "EmpID": "1411071406",
      "Department": "Sales",
      "Position": "Area Sales Manager",
      "Date of Hire": "9/29/2014",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "5",
      "Attendance Rate": "95.9173983",
      "ManagerName": "Ketsia Liebig",
      "ManagerID": "19",
      "Salary": [4228, 3951, 5875, 4001, 6730, 6776, 4417, 5343, 5635, 5022, 6210, 5038, 6101, 3149, 4363, 5998, 3534, 6850, 3995, 5463, 3650, 4854, 6382, 5470, 3192, 5635, 6578, 3865, 4134, 3104, 3007, 4928, 6026, 4688, 3834, 3260],
      "Attendance data": ["On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Bugali Josephine",
      "EmpID": "1402065355",
      "Department": "Sales",
      "Position": "Area Sales Manager",
      "Date of Hire": "11/11/2013",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "5",
      "Attendance Rate": "74.08257846",
      "ManagerName": "Alex Sweetwater",
      "ManagerID": "2",
      "Salary": [5330, 4088, 6965, 5373, 5307, 4557, 6029, 4541, 3104, 4606, 3764, 5256, 4677, 3974, 5453, 5404, 4734, 4333, 4629, 3515, 3436, 6026, 3801, 4609, 4789, 4482, 4824, 3387, 5215, 4034, 4815, 3930, 4597, 4618, 5753, 3216],
      "Attendance data": ["On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Bunbury Jessica",
      "EmpID": "1011022818",
      "Department": "Sales",
      "Position": "Area Sales Manager",
      "Date of Hire": "8/15/2011",
      "Date of Termination": "8/2/2014",
      "Performance Score": "5",
      "EmpSatisfaction": "5",
      "Attendance Rate": "93.17672859",
      "ManagerName": "Ketsia Liebig",
      "ManagerID": "19",
      "Salary": [6755, 5312, 6666, 4929, 3365, 3467, 5975, 3671, 5065, 4446, 3262, 3049, 4697, 5917, 6806, 4930, 6300, 4748, 6877, 3791, 3252, 4392, 6227, 3231, 5306, 4160, 6480, 4356, 3628, 6005, 4484, 6018, 4718, 4745, 4263, 3652],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Burke Joelle",
      "EmpID": "1106026474",
      "Department": "Production",
      "Position": "Production Technician II",
      "Date of Hire": "3/5/2012",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "3",
      "Attendance Rate": "84.72520578",
      "ManagerName": "Michael Albert",
      "ManagerID": "22",
      "Salary": [3375, 3966, 6565, 3362, 4264, 4179, 6405, 6866, 4268, 4604, 5364, 6364, 4192, 6495, 3137, 6293, 3468, 3325, 4153, 3580, 3905, 3628, 6936, 4916, 6007, 6828, 3506, 3620, 3131, 4496, 4210, 6128, 6335, 3654, 4395, 4339],
      "Attendance data": ["On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Burkett Benjamin",
      "EmpID": "1001417624",
      "Department": "Production",
      "Position": "Production Technician II",
      "Date of Hire": "4/4/2011",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "4",
      "Attendance Rate": "88.70922939",
      "ManagerName": "Webster Butler",
      "ManagerID": "39",
      "Salary": [3426, 4043, 3430, 6226, 3234, 5664, 6720, 6106, 6993, 5059, 3255, 6566, 6007, 3794, 3917, 5600, 4449, 5738, 3679, 6760, 4173, 6373, 4441, 4853, 6656, 5010, 5848, 3575, 5696, 6745, 6016, 3323, 3430, 3195, 4759, 5794],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Butler Webster L",
      "EmpID": "1192991000",
      "Department": "Production",
      "Position": "Production Manager",
      "Date of Hire": "1/28/2016",
      "Date of Termination": "",
      "Performance Score": "4",
      "EmpSatisfaction": "5",
      "Attendance Rate": "88.29974777",
      "ManagerName": "Simon Roup",
      "ManagerID": "2",
      "Salary": [3732, 4325, 3446, 3479, 3068, 5194, 3336, 3315, 3819, 4794, 5775, 5456, 3703, 4087, 4042, 5158, 5165, 5452, 3420, 5048, 5576, 6501, 4031, 6632, 5002, 6343, 6384, 5446, 5741, 5069, 6680, 6388, 5337, 6942, 3762, 3803],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Campain Michael",
      "EmpID": "1408071958",
      "Department": "IT/IS",
      "Position": "BI Developer",
      "Date of Hire": "5/13/2013",
      "Date of Termination": "",
      "Performance Score": "4",
      "EmpSatisfaction": "3",
      "Attendance Rate": "97.24189586",
      "ManagerName": "Brian Champaigne",
      "ManagerID": "13",
      "Salary": [6425, 3559, 6799, 4962, 6699, 5958, 5431, 4919, 4689, 6650, 4746, 5898, 3346, 4219, 5418, 3472, 4006, 6907, 6945, 3548, 4740, 5683, 3442, 3455, 3610, 4605, 3185, 3394, 5912, 4052, 4063, 6640, 3956, 4747, 4163, 4118],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Campos Jen",
      "EmpID": "1412071660",
      "Department": "Production",
      "Position": "Production Technician I",
      "Date of Hire": "9/22/2014",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "3",
      "Attendance Rate": "87.34819773",
      "ManagerName": "Janet King",
      "ManagerID": "2",
      "Salary": [4284, 4684, 6578, 4459, 6913, 4387, 4830, 6152, 4994, 5281, 6085, 3117, 6747, 6147, 3256, 4364, 3524, 4651, 5486, 6496, 3294, 6276, 6293, 3085, 4177, 3617, 5707, 5093, 4226, 3796, 3046, 5098, 5726, 6429, 4123, 4942],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Carabbio Judith",
      "EmpID": "1201031307",
      "Department": "Admin Offices",
      "Position": "Area Sales Manager",
      "Date of Hire": "1/14/2013",
      "Date of Termination": "",
      "Performance Score": "4",
      "EmpSatisfaction": "2",
      "Attendance Rate": "91.497292",
      "ManagerName": "Brandon R. LeBlanc",
      "ManagerID": "1",
      "Salary": [3489, 4736, 6521, 4580, 4571, 5529, 3382, 3136, 6343, 4313, 4687, 3152, 6282, 3182, 6880, 6767, 5157, 6719, 6677, 6634, 5515, 4227, 3230, 3153, 5252, 4106, 3530, 6837, 4293, 3603, 6025, 6788, 3069, 3854, 4280, 6901],
      "Attendance data": ["On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    },
    {
      "Employee Name": "Carreiro Keith",
      "EmpID": "1108028108",
      "Department": "Admin Offices",
      "Position": "Senior Accountant",
      "Date of Hire": "3/30/2015",
      "Date of Termination": "",
      "Performance Score": "5",
      "EmpSatisfaction": "2",
      "Attendance Rate": "90.50252966",
      "ManagerName": "Brandon R. LeBlanc",
      "ManagerID": "1",
      "Salary": [3178, 4348, 5727, 4032, 4481, 6467, 4062, 3076, 5944, 4713, 5988, 4239, 3179, 6180, 4191, 5658, 5208, 6584, 6581, 6947, 4391, 5121, 5649, 4469, 5635, 4051, 4172, 4522, 4973, 6089, 6580, 3866, 3368, 5987, 6257, 3475],
      "Attendance data": ["On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "Late", "On-Time", "On-Time", "On-Time", "On-Time", "On-Time"]
    }
  ];


  //5- Calculate the total number of employees, Average Salary, Number of Managers --------------------------------------------------------------------
  const totalEmployees = tableData.length;
  const totalSpan = document.getElementById("total")
  totalSpan.textContent = `${totalEmployees}/${totalEmployees}`;

  const salaries = tableData.flatMap((employee) => employee["Salary"]);
  const totalSalary = salaries.reduce((total, salary) => total + salary, 0);
  const averageSalary = totalSalary / salaries.length;

  const totalSal = document.getElementById("salary")
  totalSal.textContent = `$${averageSalary.toFixed(1)}`;
  const uniqueManagerIDs = [];
  tableData.forEach((employee) => {
    if (employee["ManagerID"] !== "" && !uniqueManagerIDs.includes(employee["ManagerID"])) {
      uniqueManagerIDs.push(employee["ManagerID"]);
    }
  });

  const totalManagers = uniqueManagerIDs.length;
  const totalMan = document.getElementById("manager")
  totalMan.textContent = `${totalManagers}/${totalEmployees}`;



  //6- Line Graph Function --------------------------------------------------------------------
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const salariesYear1 = new Array(12).fill(0);
  const salariesYear2 = new Array(12).fill(0);
  const salariesYear3 = new Array(12).fill(0);

  tableData.forEach((employee) => {
    const salaryData = employee.Salary;
    for (let i = 0; i < 12; i++) {
      salariesYear1[i] += salaryData[i];
      salariesYear2[i] += salaryData[i + 12];
      salariesYear3[i] += salaryData[i + 24];
    }
  });

  const totalDuration = 2500;

  const salaryStatisticsChart = new Chart(document.getElementById("salaryStatisticsChart"), {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Year 1",
          data: salariesYear1,
          borderColor: "rgba(63, 130, 242, 1)",
          backgroundColor: (context) => {
            const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, context.chart.height);
            gradient.addColorStop(0.8, "rgba(63, 130, 242, 0)");
            gradient.addColorStop(0, "rgba(63, 130, 242, 0.3)");
            return gradient;
          },
          fill: true,
          borderWidth: 5,
          tension: 0.4,
        },
        {
          label: "Year 2",
          data: salariesYear2,
          borderColor: "rgba(242, 82, 140, 1)",
          backgroundColor: (context) => {
            const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, context.chart.height);
            gradient.addColorStop(0.8, "rgba(242, 82, 140, 0)");
            gradient.addColorStop(0, "rgba(242, 82, 140, 0.3)");
            return gradient;
          },
          fill: true,
          borderWidth: 5,
          tension: 0.4,
        },
        {
          label: "Year 3",
          data: salariesYear3,
          borderColor: "rgba(253, 179, 50, 1)",
          backgroundColor: (context) => {
            const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, context.chart.height);
            gradient.addColorStop(0.8, "rgba(253, 179, 50, 0)");
            gradient.addColorStop(0, "rgba(253, 179, 50, 0.3)");
            return gradient;
          },
          fill: true,
          borderWidth: 5,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      animations: {
        tension: {
          duration: 2500,
          easing: "linear",
          from: 0.5,
          to: 0.1,
          loop: true,
        },
        x: {
          type: "number",
          easing: "linear",
          duration: totalDuration,
        },
        y: {
          type: "number",
          easing: "linear",
          duration: totalDuration,
        },
        progress: {
          easing: "linear",
          from: 0,
          to: 1,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          display: true,
        },
        y: {
          display: true,
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 40,
            boxHeight: 40,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 12,
            },
          },
        },
      },
    },
  });



  //7- Helper function to group data by a specified key --------------------------------------------------------------------
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };



  //8- Polar Area Chart Functions --------------------------------------------------------------------
  const managers = groupBy(tableData, "ManagerName");
  const managerNames = Object.keys(managers);
  const numberOfEmployeesUnderManagers = managerNames.map(
    (manager) => managers[manager].length
  );

  const departments = groupBy(tableData, "Department");
  const departmentNames = Object.keys(departments);
  const numberOfEmployeesInDepartments = departmentNames.map(
    (department) => departments[department].length
  );

  const employeeCountChart = new Chart(document.getElementById("employeeCount"), {
    type: "polarArea",
    data: {
      labels: managerNames,
      datasets: [
        {
          label: "Number of Employees",
          data: numberOfEmployeesUnderManagers,
          borderWidth: 6,
          hoverBorderWidth: 0,
          borderColor: "#fff",
          borderRadius: 8,
          backgroundColor: [
            "#4476cc", "#5694ff", "#77a9ff", "#99beff", "#bbd4ff", "#dde9ff",
            "#c14170", "#f2528c", "#f474a3", "#f797ba", "#f9b9d1", "#fcdce8",
          ],
          fill: true,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          backgroundColor: "#b9bddc",
          hoverBackgroundColor: "#6b68ff",
          labels: {
            boxWidth: 40,
            boxHeight: 40,
            usePointStyle: true,
            pointStyle: 'circle',
            backgroundColor: "",
            font: {
              size: 15,
              weight: 'bold'
            },
          },
        },
      },
    },
  });




  //9- Donut Chart Funciton --------------------------------------------------------------------
  const departmentChart = new Chart(document.getElementById("departmentChart"), {
    type: "doughnut",
    data: {
      labels: departmentNames,
      datasets: [
        {
          label: " Department: ",
          data: numberOfEmployeesInDepartments,
          backgroundColor: [
            "#335899", "#4476cc", "#5694ff", "#77a9ff", "#99beff", "#bbd4ff", "#dde9ff",
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      borderWidth: 8,
      borderColor: '#fff',
      hoverBorderWidth: 0,
      borderRadius: 9,
      cutout: '45%',
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 80,
            boxHeight: 80,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 12,
            },
          },
        },
      },
    },
    plugins: [{
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;

        const centerX = width / 2;
        const centerY = height / 2.4;

        const imageSize = 40;
        const gradientRadius = imageSize / 2 + 10;

        ctx.fillStyle = '#5694FF';
        ctx.beginPath();
        ctx.arc(centerX, centerY, gradientRadius + 6, 0, Math.PI * 2);
        ctx.fill();

        const image = new Image();
        image.src = 'images/department.png';
        ctx.drawImage(image, centerX - imageSize / 2, centerY - imageSize / 2, imageSize, imageSize);
      },
    }],
  });




  //10- Attendance Bar Chart Function --------------------------------------------------------------------
  function countStatusByMonth(data, key) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const statusCounts = {
      "On-Time": Array(12).fill(0),
      "Late": Array(12).fill(0),
      "Absent": Array(12).fill(0)
    };

    data.forEach((employee) => {
      const attendanceData = employee[key];

      attendanceData.forEach((status, index) => {
        if (statusCounts[status]) {
          statusCounts[status][index]++;
        }
      });
    });

    return {
      labels: months,
      datasets: Object.keys(statusCounts).map((status) => ({
        borderWidth: 3,
        hoverBorderWidth: 0,
        borderColor: '#fff',

        borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10 },
        barThickness: 50,
        borderSkipped: false,
        label: status,
        data: statusCounts[status],
        backgroundColor: status === "Late" ? "#FFC156" : status === "Absent" ? "#F2528C" : "#528ef3",
      })),
    };
  }

  let delayed = false;

  const ctx = document.getElementById("attendanceChart").getContext("2d");
  const chartData = countStatusByMonth(tableData, "Attendance data");
  new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      maintainAspectRatio: false,
      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 40,
            boxHeight: 40,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 12,
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          stacked: true,
        },
        y: {
          stacked: true,
          beginAtZero: true,
        },
      },
    },
  });




  //11- Helper function to calculate the average of an array --------------------------------------------------------------------
  const calculateAverage = (data) => {
    const sum = data.reduce((total, currentValue) => {
      return !isNaN(currentValue) ? total + currentValue : total;
    }, 0);
    return sum / data.length;
  };




  //12- Metrics of Workplace Bar Chart Functions --------------------------------------------------------------------
  const employeeDataByDepartment = groupBy(tableData, "Department");

  const departmentAverages = [];
  for (const department in employeeDataByDepartment) {
    const employees = employeeDataByDepartment[department];

    const salaries = employees.flatMap((employee) => employee["Salary"]);
    const totalSalary = salaries.reduce((total, currentValue) => total + currentValue, 0);
    const avgSalary = (totalSalary / salaries.length) / 1000;

    const performanceScores = employees.flatMap((employee) => {
      const score = parseFloat(employee["Performance Score"]);
      return !isNaN(score) ? score : 0;
    });
    const avgPerformanceScore = calculateAverage(performanceScores);

    const attendanceRates = employees.flatMap((employee) => {
      const rate = parseFloat(employee["Attendance Rate"]);
      return !isNaN(rate) ? rate / 20 : 0;
    });
    const avgAttendanceRate = calculateAverage(attendanceRates);

    const empSatisfaction = employees.flatMap((employee) => {
      const rate = parseFloat(employee["EmpSatisfaction"]);
      return !isNaN(rate) ? rate : 0;
    });
    const avgEmpSatisfaction = calculateAverage(empSatisfaction);

    departmentAverages.push({
      department,
      avgSalary,
      avgPerformanceScore,
      avgAttendanceRate,
      avgEmpSatisfaction,
    });
  }
  const avgSalaries = departmentAverages.map((department) => department.avgSalary.toFixed(2));
  const avgPerformanceScores = departmentAverages.map((department) => department.avgPerformanceScore.toFixed(2));
  const avgAttendanceRates = departmentAverages.map((department) => department.avgAttendanceRate.toFixed(2));
  const avgEmpSatisfactionRates = departmentAverages.map((department) => department.avgEmpSatisfaction.toFixed(2));

  const departmentBarChart = new Chart(document.getElementById("departmentBarChart"), {
    type: "bar",
    data: {
      labels: departmentNames,
      datasets: [
        {
          label: "Average Salary in Thousands",
          data: avgSalaries,
          backgroundColor: "#3268c1",
          groupWidth: "50%",
        },
        {
          label: "Average Performance Rating",
          data: avgPerformanceScores,
          backgroundColor: "#3f82f2",
          groupWidth: "50%",
        },
        {
          label: "Average Attendance Rate",
          data: avgAttendanceRates,
          backgroundColor: "#F2528C",
          groupWidth: "50%",
        },
        {
          label: "Average Employee Satisfaction Rate",
          data: avgEmpSatisfactionRates,
          backgroundColor: "#FDB332",
          groupWidth: "50%",
        },
      ],
    },

    options: {
      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },
      maintainAspectRatio: false,
      borderWidth: 2,
      borderColor: '#fff',
      borderRadius: { topRight: 8, bottomRight: 8 },
      hoverBorderWidth: 0,
      barThickness: 20,
      borderSkipped: false,
      indexAxis: 'y',
      scales: {
        x: {
          stacked: true,
          beginAtZero: true,
        },
        y: {
          stacked: true,
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 40,
            boxHeight: 40,
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: 12,
            },
          },
        },
      },
    },
  });
});




//13- Pie Chart Functions --------------------------------------------------------------------
const costOfHiringData = {
  labels: ['Billboard', 'On-campus Recruiting', 'Other', 'Search Engine - Google Bing Yahoo', 'Social Networks - Facebook Twitter etc', 'Website Banner Ads'],
  datasets: [
    {
      label: 'Cost of Hiring',
      data: [520, 410, 0, 640, 500, 629],

      backgroundColor: [
        "#4476cc", "#5694ff", "#77a9ff", "#99beff", "#bbd4ff", "#dde9ff",
      ],
    },
  ]
};

const costOfHiringChart = new Chart(document.getElementById('costOfHiringChart'), {
  type: 'pie',
  data: costOfHiringData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    borderWidth: 6,
    borderRadius: 10,
    hoverBorderWidth: 0,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 40,
          boxHeight: 40,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
          },
        },
      },
    },
  }
});

const monthSelector = document.getElementById('monthSelector');
monthSelector.addEventListener('change', function () {
  const selectedMonth = this.value;
  const chartData = costOfHiringData.datasets[0].data;

  if (selectedMonth === 'January') {
    costOfHiringChart.data.datasets[0].data = [520, 410, 0, 640, 500, 629];
  } else if (selectedMonth === 'February') {
    costOfHiringChart.data.datasets[0].data = [520, 410, 5129, 640, 500, 510];
  } else if (selectedMonth === 'March') {
    costOfHiringChart.data.datasets[0].data = [520, 410, 0, 640, 500, 293];
  } else if (selectedMonth === 'April') {
    costOfHiringChart.data.datasets[0].data = [520, 820, 0, 640, 440, 810];
  } else if (selectedMonth === 'May') {
    costOfHiringChart.data.datasets[0].data = [0, 820, 0, 640, 500, 642];
  } else if (selectedMonth === 'June') {
    costOfHiringChart.data.datasets[0].data = [0, 410, 0, 640, 500, 675];
  } else if (selectedMonth === 'July') {
    costOfHiringChart.data.datasets[0].data = [612, 410, 0, 640, 440, 707];
  } else if (selectedMonth === 'August') {
    costOfHiringChart.data.datasets[0].data = [612, 820, 4892, 1300, 500, 740];
  } else if (selectedMonth === 'September') {
    costOfHiringChart.data.datasets[0].data = [729, 1230, 0, 1300, 440, 772];
  } else if (selectedMonth === 'October') {
    costOfHiringChart.data.datasets[0].data = [749, 820, 0, 1300, 440, 805];
  } else if (selectedMonth === 'November') {
    costOfHiringChart.data.datasets[0].data = [910, 410, 0, 1300, 500, 838];
  } else if (selectedMonth === 'December') {
    costOfHiringChart.data.datasets[0].data = [500, 410, 0, 1300, 500, 870];
  }
  costOfHiringChart.update();
});


