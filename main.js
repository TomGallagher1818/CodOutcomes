
let teamData = [
        {logo: 'https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt6ec730c1178cc1cd/5dd596f49147457fdde604ba/ATL-FAZ_Primary-Logo.png', name: 'Atlanta Faze', points: 260, MW: 18, ML: 7, GW: 63, GL: 41},
        {logo: 'https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/bltd3d26a209bd86036/618af2501bb8c23cf8bbede9/cdl_optic_texas_icon_dark.png', name: 'Optic Texas', points: 225, MW: 18, ML: 5, GW: 62, GL: 28},
        {logo: 'https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt0d329cd0a097bea6/5dd5972313b457491b4bf119/SEA-SUR_Primary-Logo@1x.png', name: 'Seattle Surge', points: 175, MW: 10, ML: 10, GW: 42, GL: 39},
        {logo: 'https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt7340435d7eb854ce/5de851d2174b0d0c519bca0d/FLA-MUT_Alternate-Logo@3x.png', name: 'London Royal Ravens', points: 150, MW: 12, ML: 10, GW: 42, GL: 44},
        {logo: 'https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt3d98a4fbe847704c/5e3cd3a7fbf2330bd4d042f8/toronto_ultra_logo_png-01.png', name: 'Toronto Ultra', points: 140, MW: 9, ML: 11, GW: 41, GL: 43},
        {logo: 'https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt6941d1a6f57fd4a7/61e09af05ea4533b71dccc91/cdl-boston-breach-icon-color-light.png', name: 'Boston Breach', points: 130, MW: 11, ML: 12, GW: 45, GL: 48},
        {logo: 'https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt1f6122f22e2f0ba6/5dd596f4afa1e66c2c3e73ab/LOS-GUR_Primary-Logo@1x.png', name: 'Los Angeles Guerrillas', points: 125, MW: 12, ML: 12, GW: 46, GL: 52},
        {logo: 'https://images.blz-contentstack.com/v3/assets/blt5dc2d5833c12012b/bltbe17f46bc49fffe1/5fb4275b21b96a46dc51a84f/cdl_la_thieves-red_la.png', name: 'Los Angeles Thieves', points: 120, MW: 9, ML: 12, GW: 41, GL: 44},
        {logo: 'https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/bltd7928f59c7886699/5dd596f413b457491b4bf113/MIN-ROK_Primary-Logo.png', name: 'Minnesota Røkkr', points: 110, MW: 10, ML: 8, GW: 37, GL: 35},
        {logo: 'https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blte186bdc43d9cef32/5dd596f461bae97f636aeae8/FLA-MUT_Primary-Logo.png', name: 'Florida Mutineers', points: 110, MW: 8, ML: 12, GW: 35, GL: 41},
        {logo: 'https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt93eeea5fec323adf/5dd596f469af1649167de9f3/NYC-SUB_Primary-Logo@1x.png', name: 'New York Subliners', points: 70, MW: 7, ML: 11, GW: 30, GL: 40},
        {logo: 'https://images.blz-contentstack.com/v3/assets/blta7b34f1f894a2422/blt13071bdc0cd1f9bd/5dd596f4a5d2cf498cbbae6a/PAR-LGN_Primary-Logo.png', name: 'Paris Legion', points: 20, MW: 2, ML: 16, GW: 23, GL: 28}
    ];

teamData.sort((a,b) => {
        return b.points - a.points;
    });


window.onload = () => {
        loadTableData(teamData);
        loadBracketData(teamData);

        eventListeners();
    }

function loadTableData(teamData) {
        const tableBody = document.getElementById('teamData');
        let dataHtml = '';
        for(let team of teamData) {
            dataHtml += '<tr><td><img src=' + team.logo + ' height = 20></img>     ' + team.name + '</td><td>' + team.points + '</td><td>' + team.MW 
                + '</td><td>' + team.ML + '</td><td>' + (team.MW / (team.MW + team.ML) * 100).toFixed(1) + '%</td><td>' + team.GW
                    + '</td><td>' + team.GL + '</td><td>' + (team.GW / (team.GW + team.GL) * 100).toFixed(1) + '%</td></tr>';
            }
        
        tableBody.innerHTML = dataHtml;
    }

function loadBracketData(teamData) {
    for(let i=1; i<13; i++) {
        let team = document.getElementById('team' + i.toString());
        appendHTML = team.innerHTML;
        team.innerHTML = '<div class = bracketTeam><img class=logo src=' + teamData[i-1].logo + ' height = 15></img>            ' + teamData[i-1].name + '</div>' + appendHTML;
    }
}

function replaceTeam(team, replacementID) {
    const clone = document.getElementById(team).cloneNode(true);
    let matchReplacer = document.getElementById(replacementID);
    parentNode = matchReplacer.parentNode;
    parentNode.removeChild(matchReplacer);
    clone.id = replacementID;
    parentNode.prepend(clone);
}

function dropdownListen(mainScoreID, oppositionScoreID, winnerGoesTo, loserGoesTo) {
    const selectElement = document.getElementById(mainScoreID);

        selectElement.addEventListener('change', e => {
            let opponentScore = document.getElementById(oppositionScoreID);
            let currentTeam = selectElement.parentNode.id;
            let opponentTeam = opponentScore.parentNode.id;
            if((e.target.value > opponentScore.value) && (e.target.value == 3)) {
                replaceTeam(currentTeam, winnerGoesTo);
                if(loserGoesTo != null) {
                    replaceTeam(opponentTeam, loserGoesTo)
                    }
            }
            else if ((e.target.value < opponentScore.value) && (opponentScore.value == 3)) {
                replaceTeam(opponentTeam, winnerGoesTo);
                if(loserGoesTo != null) {
                    replaceTeam(currentTeam, loserGoesTo);
                }
            }
            
        });
}

function eventListeners() {
    dropdownListen('match1Ascore', 'match1Bscore', 'match1winner', 'match1loser');
    dropdownListen('match1Bscore', 'match1Ascore', 'match1winner', 'match1loser');
    dropdownListen('match2Ascore', 'match2Bscore', 'match2winner', 'match2loser');
    dropdownListen('match2Bscore', 'match2Ascore', 'match2winner', 'match2loser');
}