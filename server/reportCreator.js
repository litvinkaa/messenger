const ChartJSImage = require('chart.js-image');
module.exports =
{
    async createAssociationsReport(types){
        let rca_num = 0;
        let rlo_num = 0;
        let cao_num = 0;
        let nrca_num = 0;
        let sfo_num = 0;

        for (type of types){
            switch (type.type_id)
            {
                case 2:
                    rca_num ++;
                    break;
                case 3:
                    rlo_num ++;
                    break;
                case 4:
                    cao_num ++;
                    break;
                case 5:
                    nrca_num ++;
                    break;
                case 6:
                    sfo_num ++;
                    break;
                                    
            
            

            }
        }
        
        const pie_chart = ChartJSImage().chart({
            "type": "pie",
            "data": {
              "labels": [
                `Громадське об'єднання зі статусом юридичної особи - ${rca_num}`,
                `Місцевий осередок із статусом юридичної особи - ${rlo_num}`,
                `Відокремлений підрозділ громадського об’єднання - ${cao_num}`,
                `Громадське об’єднання, утворене без статусу юридичної особи - ${nrca_num}`,
                `Відокремлений підрозділ іноземної неурядової організації - ${sfo_num}`
              ],
              "datasets": [
                {
                    "label": 'My First Dataset',
                    "data": [rca_num, rlo_num, cao_num,nrca_num,sfo_num],
                    "backgroundColor": [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)',
                      'rgb(0, 205, 255)',
                      'rgb(0, 0, 0)'
                    ]
                }
              ]
            }
          }) 
          .backgroundColor('white')
          .width(500) 
          .height(300); 
          
          return pie_chart.toDataURI(); 
        
    },
    async createRegistersReport(temp_blocked_num, blocked_num, active_num){
      const pie_chart = ChartJSImage().chart({
        "type": "pie",
        "data": {
          "labels": [
            `Тимчасово заблоковані реєстратори - ${temp_blocked_num}`,
            `Заблоковані реєстратори - ${blocked_num}`,
            `Реєстратори з доступом - ${active_num}`
          ],
          "datasets": [
            {
                "label": 'My First Dataset',
                "data": [temp_blocked_num, blocked_num, active_num],
                "backgroundColor": [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                  
                ]
            }
          ]
        }
      }) 
      .backgroundColor('white')
      .width(500) 
      .height(300); 
      
      return pie_chart.toDataURI();
        
    },
    async createWorkReport(regions, assosiations){
      let rca_num_general = 0;
      let rlo_num_general  = 0;
      let cao_num_general  = 0;
      let nrca_num_general  = 0;
      let sfo_num_general  = 0;
      let rows = [];
      let idx = 0;
      for(region of regions)
      { 
        let row = [];
        for(assosiation of assosiations)
        {
          if(assosiation.adress.split(':')[0] === region.region_name)
          {
            switch (assosiation.type_id)
            {
                case 2:
                    region.rca_num ++;
                    rca_num_general ++;
                    break;
                case 3:
                    region.rlo_num ++;
                    rlo_num_general ++;
                    break;
                case 4:
                    region.cao_num ++;
                    cao_num_general ++;
                    break;
                case 5:
                    region.nrca_num ++;
                    nrca_num_general ++;
                    break;
                case 6:
                    region.sfo_num ++;
                    sfo_num_general ++;
                    break;
            }
          }
        }
        row[0] = region.region_name;
        row[1] = region.rca_num;
        row[2] = region.rlo_num;
        row[3] = region.cao_num;
        row[4] = region.nrca_num;
        row[5] = region.sfo_num;
        row[6] = region.rca_num + region.rlo_num + region.cao_num + region.nrca_num + region.sfo_num;

        rows[idx] = row;
        idx++;
      }
      let last_row = [];
      last_row[0] = "∑";
      last_row[1] = rca_num_general;
      last_row[2] = rlo_num_general;
      last_row[3] = cao_num_general;
      last_row[4] = nrca_num_general;
      last_row[5] = sfo_num_general;
      last_row[6] = rca_num_general + rlo_num_general + cao_num_general + nrca_num_general + sfo_num_general;
      rows[idx] = last_row;

      const table = {
       
        headers: ["Регіон", "Громадське об’єднання із статусом юридичної особи", "Місцевий осередок із статусом юридичної особи","Відокремлений підрозділ громадського об’єднання","Громадське об’єднання, утворене без статусу юридичної особи","Відокремлений підрозділ іноземної неурядової організації","∑"],
        rows: rows,
      };
        return table;
    }
}