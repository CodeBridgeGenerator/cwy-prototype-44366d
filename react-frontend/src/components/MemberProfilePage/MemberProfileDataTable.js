import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../services/uploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../utils/DownloadCSV";

const MemberProfileDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');

const dropdownTemplate0 = (rowData, { rowIndex }) => <p >{rowData.name?.name}</p>
const calendarTemplate1 = (rowData, { rowIndex }) => <p>{new Date(rowData.dateOfBirth).toLocaleDateString()}</p>
const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.gender}</p>
const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.phonenumber}</p>
const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.address}</p>
const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.educationlevel}</p>
const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.nationality}</p>
const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.IDnumber}</p>
const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.previousInstituteName}</p>
const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.employmentStatus}</p>
const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.skills}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;
    const paginatorLeft = <Button type="button" icon="pi pi-upload" text onClick={() => setShowUpload(true)} disabled={!false}/>;
    const paginatorRight = DownloadCSV({ data : items, fileName : "memberProfile"});
    const exportCSV = () => {dt.current?.exportCSV();};

    return (
        <>
        <DataTable value={items} ref={dt} removableSort onRowClick={onRowClick} scrollable rowHover stripedRows paginator rows={10} rowsPerPageOptions={[10, 50, 250, 500]} size={"small"}  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} rowClassName="cursor-pointer" alwaysShowPaginator={!urlParams.singleUsersId} loading={loading}>
<Column field="name" header="Name" body={dropdownTemplate0} filter={selectedFilterFields.includes("name")} hidden={selectedHideFields?.includes("name")}  style={{ minWidth: "8rem" }} />
<Column field="dateOfBirth" header="Date Of Birth" body={calendarTemplate1} filter={selectedFilterFields.includes("dateOfBirth")} hidden={selectedHideFields?.includes("dateOfBirth")}  sortable style={{ minWidth: "8rem" }} />
<Column field="gender" header="Gender" body={pTemplate2} filter={selectedFilterFields.includes("gender")} hidden={selectedHideFields?.includes("gender")}  sortable style={{ minWidth: "8rem" }} />
<Column field="phonenumber" header="Phone Number" body={pTemplate3} filter={selectedFilterFields.includes("phonenumber")} hidden={selectedHideFields?.includes("phonenumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="address" header="Address" body={pTemplate4} filter={selectedFilterFields.includes("address")} hidden={selectedHideFields?.includes("address")}  sortable style={{ minWidth: "8rem" }} />
<Column field="educationlevel" header="Education Level" body={pTemplate5} filter={selectedFilterFields.includes("educationlevel")} hidden={selectedHideFields?.includes("educationlevel")}  sortable style={{ minWidth: "8rem" }} />
<Column field="nationality" header="Nationality" body={pTemplate6} filter={selectedFilterFields.includes("nationality")} hidden={selectedHideFields?.includes("nationality")}  sortable style={{ minWidth: "8rem" }} />
<Column field="IDnumber" header="ID Number" body={pTemplate7} filter={selectedFilterFields.includes("IDnumber")} hidden={selectedHideFields?.includes("IDnumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="previousInstituteName" header="Previous Institute Name" body={pTemplate8} filter={selectedFilterFields.includes("previousInstituteName")} hidden={selectedHideFields?.includes("previousInstituteName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="employmentStatus" header="Employment Status" body={pTemplate9} filter={selectedFilterFields.includes("employmentStatus")} hidden={selectedHideFields?.includes("employmentStatus")}  sortable style={{ minWidth: "8rem" }} />
<Column field="skills" header="Skills" body={pTemplate10} filter={selectedFilterFields.includes("skills")} hidden={selectedHideFields?.includes("skills")}  sortable style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
        </DataTable>
        <Dialog header="Upload MemberProfile Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService />
      </Dialog>

      <Dialog header="Search MemberProfile" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default MemberProfileDataTable;