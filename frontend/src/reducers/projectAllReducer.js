import {
    ALL_PROJECTALL_FAIL,
    ALL_PROJECTALL_REQUEST,
    ALL_PROJECTALL_SUCCESS,

    ADMIN_PROJECTALL_REQUEST,
    ADMIN_PROJECTALL_FAIL,
    ADMIN_PROJECTALL_SUCCESS,

    NEW_PROJECT_FAIL,
    NEW_PROJECT_REQUEST,
    NEW_PROJECT_SUCCESS,
    NEW_PROJECT_RESET,

    NEWAll_PROJECT_FAIL,
    NEWAll_PROJECT_REQUEST,
    NEWAll_PROJECT_RESET,
    NEWAll_PROJECT_SUCCESS,

    UPDATE_ADMINPROJECT_FAIL,UPDATE_ADMINPROJECT_REQUEST,UPDATE_ADMINPROJECT_SUCCESS,
    UPDATE_ADMINPROJECT_RESET,

    DELETE_ADMINPROJECT_FAIL,
    DELETE_ADMINPROJECT_REQUEST,
    DELETE_ADMINPROJECT_RESET,
    DELETE_ADMINPROJECT_SUCCESS,

    PROJECT_DETAILS_REQUEST,
    PROJECT_DETAILS_FAIL,
    PROJECT_DETAILS_SUCCESS,
    CLEAR_ERRORS
}from '../constants/projectAllConstants'
//get all tab project
export const projectAllReducer=(state={projectDetails:[]},action)=>{
    switch (action.type){
        case ALL_PROJECTALL_REQUEST:
            case ADMIN_PROJECTALL_REQUEST:
            return{
                loading:true,
                projectDetails:[],
            }
        case ALL_PROJECTALL_SUCCESS:
            case ADMIN_PROJECTALL_SUCCESS:
            return{
                loading:false,
                projectDetails:action.payload.projectDetails
            };
        case ALL_PROJECTALL_FAIL:
            case ADMIN_PROJECTALL_FAIL:
            return{
                loading:false,
                error:action.payload,
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null,
                };
        default:
            return state;
    }
};
//new all project =>all tab
export const newProjectAllReducer = (state = { projectDetails:[] }, action) => {
  switch (action.type) {
    case NEWAll_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEWAll_PROJECT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        projectDetails:action.payload.projectDetails,
      };
    case NEWAll_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEWAll_PROJECT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//for admin self
export const projectAllAdminReducer=(state={projectAdminDetailsAll:[]},action)=>{
  switch (action.type){
     
          case ADMIN_PROJECTALL_REQUEST:
          return{
              loading:true,
              projectAdminDetailsAll:[],
          }
         
          case ADMIN_PROJECTALL_SUCCESS:
          return{
              loading:false,
              projectAdminDetailsAll:action.payload.projectAdminDetailsAll
          };
     
          case ADMIN_PROJECTALL_FAIL:
          return{
              loading:false,
              error:action.payload,
          }
          case CLEAR_ERRORS:
              return{
                  ...state,
                  error:null,
              };
      default:
          return state;
  }
};
//self sepearte projectdetail
export const projectAllDetailsReducer=(state={projectDetail:{}},action)=>{
    switch (action.type){
        case PROJECT_DETAILS_REQUEST:
            return{
                loading:true,
                ...state,
            }
        case PROJECT_DETAILS_SUCCESS:
            return{
                loading:false,
                projectDetail:action.payload.projectDetail
            };
        case PROJECT_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload,
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null,
                };
        default:
            return state;
    }
};

//update delete admin

export const projectUpdateDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ADMINPROJECT_REQUEST:
    case UPDATE_ADMINPROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ADMINPROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ADMINPROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_ADMINPROJECT_FAIL:
    case UPDATE_ADMINPROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ADMINPROJECT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_ADMINPROJECT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
//new create admin project
export const newProjectReducer = (state = { projectAdminDetailsAll:[] }, action) => {
    switch (action.type) {
      case NEW_PROJECT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_PROJECT_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          projectAdminDetailsAll:action.payload.projectAdminDetailsAll,
        };
      case NEW_PROJECT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_PROJECT_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  